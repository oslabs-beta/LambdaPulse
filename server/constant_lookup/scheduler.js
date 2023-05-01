const { getArns } = require('./db_setup/schedulerDb.js');
const { getCredentialsForAllArns } = require('./aws_creds/temp_credentials.js');

let currNodes;
let expirationTime;

const main = async () => {
  const currentTime = Date.now();
  let currentCredentials;
  if (!currNodes || (expirationTime && currentTime > expirationTime)) {
    const arnArray = await getArns();
    currentCredentials = await getCredentialsForAllArns(arnArray);
    expirationTime = currentTime + 60 * 60 * 1000;
    console.log(currentCredentials);
  } else {
    console.log('skipped');
  }
};

main();
setInterval(main, 10 * 60 * 1000);
