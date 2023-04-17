require('dotenv').config();

const {
  XRayClient,
  GetTraceSummariesCommand,
  BatchGetTracesCommand,
} = require('@aws-sdk/client-xray');

const main = require('./sortingSegments');

const awsCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

// only needed if issues with aws cli
// process.env.AWS_ACCESS_KEY_ID = awsCredentials.accessKeyId;
// process.env.AWS_SECRET_ACCESS_KEY = awsCredentials.secretAccessKey;

const xClient = new XRayClient(awsCredentials);

const getTraceSummary = async () => {
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

  const params = {
    StartTime: startTime,
    EndTime: endTime,
  };

  const response = await xClient.send(new GetTraceSummariesCommand(params));
  return response;
};

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

const getTraceDetails = async (traceIds) => {
  const params = {
    TraceIds: traceIds,
  };

  const response = await xClient.send(new BatchGetTracesCommand(params));
  return response;
};

// getTraceDetails(traceId)
//   .then((result) => {
//     console.log(result.Traces[0].Segments);
//   })
//   .catch((err) => {
//     console.log(err, ' in gettracedetails');
//   });

const getTraceMiddleware = {
  getSummary: async (req, res, next) => {
    // get the data in xray. will return an array on res
    try {
      const result = await getTraceSummary();
      const traceArray = result.TraceSummaries;
      const traceIds = traceArray.map((node) => {
        return node.Id;
      });
      res.locals.traceArray = traceIds;
      next();
    } catch (err) {
      next(err);
    }
  },

  // get segment data
  getSegmentArray: async (req, res, next) => {
    try {
      const result = await getTraceDetails(res.locals.traceArray);
      // will be an array of objects for each trace. in each trace object is a
      // segment property which will go to next middleware for sorting
      // next middleware function will take care of iterating and main will sort
      res.locals.traceSegmentData = result.Traces;
      next();
    } catch (err) {
      next(err);
    }
  },

  sortSegments: (req, res, next) => {
    try {
      const allNodes = [];

      for (let i = 0; i < res.locals.traceSegmentData; i++) {
        const currSegment = res.locals.traceSegmentData[i].Segments;
        const currRoot = main(currSegment);
        allNodes.push(currRoot);
      }
      res.local.nodes = allNodes;
      next();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = getTraceMiddleware;
