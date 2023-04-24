require('dotenv').config();
const { query } = require('../db.config.js');

const {
  XRayClient,
  GetTraceSummariesCommand,
  BatchGetTracesCommand,
} = require('@aws-sdk/client-xray');
const {
  CloudWatchLogsClient,
  FilterLogEventsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');
const aws = require('aws-sdk');

const Redis = require('redis');
const redisClient = Redis.createClient();
redisClient.connect();
redisClient.on('error', (err) => {
  console.error(err);
});

const main = require('./sortingSegments');
// const { query } = require('express');
//redis client to add traces to redis

// const awsCredentials = {
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// };

// only needed if issues with aws cli
// process.env.AWS_ACCESS_KEY_ID = awsCredentials.accessKeyId;
// process.env.AWS_SECRET_ACCESS_KEY = awsCredentials.secretAccessKey;

// const xClient = new XRayClient(awsCredentials);

// console.log(getTraceSummary());

// will return an array of traceIds.
// getTraceSummary()
//   .then((result) => {
//     console.log(result);
//     const traceArr = result.TraceSummaries;
//     const traceIds = traceArr.map((node) => {
//       return node.Id;
//     });
//     return traceIds;
//   })
//   .catch((err) => {
//     console.log(err, 'err in getTraceSummary');
//   });

//below will give you the subsegments for each traceId

// getTraceDetails(traceId)
//   .then((result) => {
//     console.log(result.Traces[0].Segments);
//   })
//   .catch((err) => {
//     console.log(err, ' in gettracedetails');
//   });

console.log('out of get logs');
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
      console.log('this is nodes', allNodes);
      try {
        console.log('HOOBLA');
        redisClient.set('Traces', JSON.stringify(allNodes));
        console.log('HOOBLA PT 2');
      } catch (err) {
        next(err);
      }
      // inserting new traces into traces table
      try {
        const insertTraceQuery =
          'INSERT INTO traces (_id, user_id, root_node) VALUES ($1,$2,$3) ON CONFLICT (_id) DO NOTHING RETURNING * ;';
        for (let i = 0; i < allNodes.length; i++) {
          const rootNode = allNodes[i];
          const traceId = rootNode.id;
          console.log(rootNode.fullData.Document.start_time);
          const result = await query(insertTraceQuery, [
            traceId,
            userId,
            JSON.stringify(rootNode),
          ]);
          if (result.rowCount > 0) {
            console.log('Inserted trace in DB', result.rows[0]);
          } else {
            console.log(`Trace with id ${traceId} already exists in DB`);
          }
        }
        // Deleting traces older than 7 days long
        const deleteOldTracesQuery = `DELETE FROM traces WHERE user_id = $1 AND ((root_node -> 'fullData' ->
        'Document' ->> 'start_time')::double precision < EXTRACT(EPOCH FROM (NOW() - INTERVAL '7 days')));`;
        await query(deleteOldTracesQuery, [userId]);
      } catch (err) {
        console.log('error', err);
        next(err);
      }

      // Selecting traces, sorting them in descending order and passing on to res.locals
      try {
        const selectTracesQuery = `SELECT root_node FROM traces WHERE user_id = $1 ORDER BY (root_node -> 'fullData' -> 
        'Document' ->> 'start_time')::double precision DESC;`;
        const tracesResult = await query(selectTracesQuery, [userId]);

        const userTraces = tracesResult.rows.map((row) => row.root_node);
        console.log('this is userTraces', userTraces);
        res.locals.userTraces = userTraces;
      } catch (err) {
        console.log('error', err);
        next(err);
      }

      next();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = getTraceMiddleware;
