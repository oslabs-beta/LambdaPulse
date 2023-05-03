const { getUsersAndArns } = require('./db_setup/schedulerDb.js');
const { getCredentialsForAllArns } = require('./aws_creds/temp_credentials.js');
const axios = require('axios');
const getConstantTrace = require('./controllers/aws_middleware.js');

// in current node all i need is
// at property credenitals. accessKeyId: 'ASIAT22Z7P7VM7IVUKDP',
// secretAccessKey: 'ioOhsf9dhE2crgOzsBUUvRUIb6PpddSON431jCqe',
// sessionToken: 'IQoJb3JpZ2luX2VjEJ///////////
let currNodes;
let expirationTime;

const main = async () => {
  const currentTime = Date.now();
  let currentCredentials;
  if (!currNodes || (expirationTime && currentTime > expirationTime)) {
    // before we had a string  with arn
    // now its an object with id and role_arn
    const arnArray = await getUsersAndArns();
    // console.log(arnArray);
    currNodes = await getCredentialsForAllArns(arnArray);
    // console.log(currNodes);
    expirationTime = currentTime + 60 * 60 * 1000;
  }
  for (let i = 0; i < currNodes.length; i++) {
    // console.log(currNodes[i]);
    try {
      console.log('in for loop');
      // console.log(currNodes[i]);
      const result = await getConstantTrace.getSummary(currNodes[i].tempCreds);
      // console.log(result);
      if (result.length > 1) {
        const full_trace_arr = await getConstantTrace.getSegmentArray(
          currNodes[i].tempCreds,
          result
        );
        const fullySorted = await getConstantTrace.sortSegments(
          full_trace_arr,
          currNodes[i].id,
          currNodes[i].tempCreds
        );
      }
    } catch (error) {
      console.log('error in for loop');
    }
  }
};

main();
setInterval(main, 10 * 60 * 1000);
