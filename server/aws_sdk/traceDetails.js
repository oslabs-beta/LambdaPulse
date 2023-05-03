require('dotenv').config();
const { query } = require('../db.config.js');
const Redis = require('ioredis');

const {
  XRayClient,
  GetTraceSummariesCommand,
  BatchGetTracesCommand,
} = require('@aws-sdk/client-xray');
const {
  CloudWatchLogsClient,
  FilterLogEventsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');

let redisClient;

if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST') {
  console.log('devmode in rediscontroller');
  redisClient = new Redis();
} else {
  console.log('not devmode in rediscontroller');
  redisClient = new Redis({
    host: 'redis',
    port: 6379,
  });
}
redisClient.on('connect', () => {
  console.log('Connected to Redis.');
});

redisClient.on('error', (err) => {
  console.error(err);
});

const main = require('./sortingSegments');

const getTraceMiddleware = {
  getSummary: async (req, res, next) => {
    if (res.locals.redisTraces != undefined) return next();
    console.log('in getTraceMiddleware');

    const xClient = new XRayClient({
      credentials: res.locals.awsCredentials,
      region: 'us-east-1',
    });
    const getTraceSummary = async () => {
      console.log('in getTracesummary');
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

      const params = {
        StartTime: startTime,
        EndTime: endTime,
        TimeRangeType: 'TraceId',
      };

      const response = await xClient.send(new GetTraceSummariesCommand(params));

      return response;
    };
    // get the data in xray. will return an array on res
    try {
      const result = await getTraceSummary();
      const traceArray = result.TraceSummaries;
      const traceIds = traceArray.map((node) => {
        // console.log(node);
        // get arn for each node
        // console.log(node.ResourceARNs[1]);
        // console.log(node.Id);
        return node.Id;
      });
      // console.log(traceIds);
      res.locals.traceArray = traceIds;
      next();
    } catch (err) {
      next(err);
    }
  },

  // get segment data
  getSegmentArray: async (req, res, next) => {
    if (res.locals.redisTraces != undefined) return next();
    console.log('in getSegmentArray');
    const xClient = new XRayClient({
      credentials: res.locals.awsCredentials,
      region: 'us-east-1',
    });
    const getTraceDetails = async (traceIds) => {
      const params = {
        TraceIds: traceIds,
      };

      const response = await xClient.send(new BatchGetTracesCommand(params));
      return response;
    };
    try {
      let fullTraceArray = [];

      let currTraceIds = [];
      while (res.locals.traceArray.length) {
        if (currTraceIds.length < 5)
          currTraceIds.push(res.locals.traceArray.shift());
        else {
          const result = await getTraceDetails(currTraceIds);
          fullTraceArray = fullTraceArray.concat(result.Traces);
          currTraceIds = [];
        }
      }
      if (currTraceIds.length > 0) {
        const result = await getTraceDetails(currTraceIds);
        fullTraceArray = fullTraceArray.concat(result.Traces);
      }
      console.log(fullTraceArray, 'this is full trace array');
      res.locals.traceSegmentData = fullTraceArray;
      next();
    } catch (err) {
      next({ log: err });
    }
  },

  sortSegments: async (req, res, next) => {
    if (res.locals.redisTraces != undefined) {
      res.locals.userTraces = res.locals.redisTraces;
      return next();
    }
    console.log('in sortedSegments');
    try {
      const allNodes = [];
      // traceIds can be found at the element

      for (let i = 0; i < res.locals.traceSegmentData.length; i++) {
        const currSegment = res.locals.traceSegmentData[i].Segments;
        // console.log(currSegment);
        const currRoot = main(currSegment);

        // below is the process to get the logs for the lambda functions
        // currRoot[0] is the node
        let currentAllSegments = currRoot[1];

        if (currentAllSegments.length) {
          for (let i = 0; i < currentAllSegments.length; i++) {
            if (
              currentAllSegments[i].Document.origin === 'AWS::Lambda' &&
              currentAllSegments[i].Document.aws.request_id
            ) {
              let requestId = currentAllSegments[i].Document.aws.request_id;
              let segmentName = `/aws/lambda/${currentAllSegments[i].Document.name}`;
              // await getLogs();
              console.log(requestId, ' ', segmentName);

              // call the functino for get logs in here and add the to the node
              // add the logs onto currRoot[0].logs = logs or something

              const logs = await getLogs(requestId, segmentName);

              logs.forEach((log) => {
                if (log.message.includes('START')) {
                  currRoot[0].cold_start = true;
                }
              });
              currRoot[0].logs = logs;
            }
          }
        }
        allNodes.push(currRoot[0]);
      }

      async function getLogs(requestId, logGroupName) {
        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - 60 * 60 * 1000);

        const cloudwatchlogs = new CloudWatchLogsClient({
          credentials: res.locals.awsCredentials,
          region: 'us-east-1',
        });

        const params = {
          logGroupName,

          startTime: startTime.getTime(),
          endTime: endTime.getTime(),

          // filter:
        };

        const command = new FilterLogEventsCommand(params);

        try {
          const data = await cloudwatchlogs.send(command);
          console.log(data, 'this is the data');
          const node_logs = data.events.filter((segEvent) => {
            return segEvent.message.includes(requestId);
          });
          return node_logs;
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      }
      res.locals.nodes = allNodes;
      const userId = res.locals.userId;
      console.log('userId:', userId);

      console.log('this is nodes', allNodes);

      // inserting new traces into traces table
      try {
        const insertTraceQuery = `
        INSERT INTO traces (_id, root_node, role_arn)
        VALUES ($1, $2, (SELECT role_arn FROM users WHERE _id = $3))
        ON CONFLICT (_id) DO NOTHING RETURNING *;
      `;
        for (let i = 0; i < allNodes.length; i++) {
          const rootNode = allNodes[i];
          const traceId = rootNode.id;
          console.log(rootNode.fullData.Document.start_time);
          const resultTraces = await query(insertTraceQuery, [
            traceId,
            JSON.stringify(rootNode),
            userId,
          ]);
          if (resultTraces.rowCount > 0) {
            console.log('Inserted trace in DB', resultTraces.rows[0]);
          } else {
            console.log(`Trace with id ${traceId} already exists in DB`);
          }
        }
        const deleteOldTracesQuery = `
        DELETE FROM traces
        WHERE role_arn = (SELECT role_arn FROM users WHERE _id = $1)
        AND ((root_node -> 'fullData' -> 'Document' ->> 'start_time')::
        double precision < EXTRACT(EPOCH FROM (NOW() - INTERVAL '7 days')));`;
        await query(deleteOldTracesQuery, [userId]);
      } catch (err) {
        console.log('error', err);
        next(err);
      }

      // Selecting traces, sorting them in descending order and passing on to res.locals
      try {
        const selectTracesQuery = `
        SELECT t.root_node
        FROM traces t
        JOIN users u ON t.role_arn = u.role_arn
        WHERE u._id = $1
        ORDER BY (t.root_node -> 'fullData' -> 'Document' ->> 'start_time')::double precision DESC;
      `;
        const tracesResult = await query(selectTracesQuery, [userId]);

        const userTraces = tracesResult.rows.map((row) => row.root_node);
        console.log('this is userTraces', userTraces);
        res.locals.userTraces = userTraces;
      } catch (err) {
        console.log('error', err);
        next(err);
      }

      try {
        console.log('HOOBLA');
        redisClient.set('Traces', JSON.stringify(res.locals.userTraces));
        console.log('HOOBLA PT 2');
      } catch (err) {
        next(err);
      }

      next();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = getTraceMiddleware;
