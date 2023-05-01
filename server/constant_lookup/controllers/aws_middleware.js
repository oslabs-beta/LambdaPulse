require('dotenv').config();
const { query } = require('../../db.config.js');
const { main } = require('../../aws_sdk/sortingSegments.js');

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

// rewritten to get rid of unnecessary steps
const getConstantTrace = {
  getSummary: async (temp_credentials) => {
    console.log('in getTraceMiddleware');

    const xClient = new XRayClient({
      credentials: temp_credentials,
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

    try {
      const result = await getTraceSummary();
      const traceArray = result.TraceSummaries;
      const traceIds = traceArray.map((node) => {
        return node.Id;
      });

      // console.log(traceIds);
      return traceIds;
    } catch (err) {
      console.log('error');
      throw err;
    }
  },

  getSegmentArray: async (temp_credentials, traceArray) => {
    console.log('in getSegmentArray');
    const xClient = new XRayClient({
      credentials: temp_credentials,
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
      while (traceArray.length) {
        if (currTraceIds.length < 5) currTraceIds.push(traceArray.shift());
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
      return fullTraceArray;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  sortSegments: async (traceArr, userId, awsCredentials) => {
    console.log('in sorted Segments');
    try {
      const allNodes = [];
      for (let i = 0; i < traceArr.length; i++) {
        const currSegment = traceArr[i].Segments;
        const currRoot = main(currSegment);
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
        }

        // Selecting traces, sorting them in descending order and returning userTraces
        try {
          const selectTracesQuery = `
    SELECT t.root_node
    FROM traces t
    JOIN users u ON t.role_arn = u.role_arn
    WHERE u._id = $1
    ORDER BY (t.root_node -> 'fullData' -> 'Document' ->> 'start_time')::double precision DESC;
  `;
          const tracesResult = await (selectTracesQuery, [userId]);

          const userTraces = tracesResult.rows.map((row) => row.root_node);
          console.log('this is userTraces', userTraces);
          return userTraces;
        } catch (err) {
          console.log('error', err);
          throw err;
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};
module.exports = getConstantTrace;
