require('dotenv').config();
const { query } = require('../../db.config.js');

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

      console.log(traceIds);
      return traceIds;
    } catch (err) {
      console.log('error');
      throw err;
    }
  },
};
module.exports = getConstantTrace;
