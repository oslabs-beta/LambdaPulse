const { getArns } = require('./db_setup/schedulerDb.js');

const main = async () => {
  const arnArray = await getArns();
  console.log(arnArray);
};

main();
