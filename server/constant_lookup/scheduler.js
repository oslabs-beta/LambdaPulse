const { getArns } = require('./db_setup/schedulerDb.js');

let currNodes;
let expirationTime;

const main = async () => {
  const currentTime = Date.now();
  if (!currNodes || (expirationTime && currTime > expirationTime)) {
    const arnArray = await getArns();
    // need to get temporary credentials
    console.log(arnArray);
  }
};

main();
