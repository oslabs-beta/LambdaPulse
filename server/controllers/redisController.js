const { db, Logs } = require('../db.config.js');

const Redis = require('ioredis');

let redisClient = new Redis({
  port: 6379,
  host: 'redis',
});

redisClient.on('connect', () => {
  console.log('Connected to Redis.');
});

redisClient.on('error', (err) => {
  console.error(err);
});

const setLogs = (req, res, next) => {
  //Set TableName
  const TableName = Logs;
  //Pull in logs from body
  const { logs } = req.body;
  redisClient.set(TableName, JSON.stringify(logs));
  console.log('set in redis?');
  try {
    //adding logs to the database, may need to set expiration,(TTL)
    for (let i = 0; i < logs.length; i++) {
      let Item = {
        log_id: logs[i].id,
        duration: logs[i].duration,
        memoryUsed: logs[i].memoryUsed,
        result: logs[i].result,
        name: logs[i].name,
      };
      db.put({ TableName: TableName, Item: Item }).promise();
    }
    console.log('in try');
    return next();
  } catch (err) {
    console.log('Error', err);
    let error = {
      log: 'Express error handler caught redisController.setLogs',
      message: { err: err },
    };
    return next(error);
  }
};
const getLogs = async (req, res, next) => {
  //Set TableName
  const TableName = Logs;
  //Pull in logs from redis
  try {
    let data = await redisClient.get(Logs);
    res.locals.logs = JSON.parse(data);
    return next();
  } catch (err) {
    console.log('Error', err);
    let error = {
      log: 'Express error handler caught redisController.getLogs',
      message: { err: err },
    };
    return next(error);
  }
};
const getErrLogs = async (req, res, next) => {
  //Set TableName
  const TableName = Logs;
  //Pull in logs from redis
  try {
    let data = await redisClient.get(Logs);
    res.locals.logs = JSON.parse(data).filter((elem) => elem.result == 'error');
    return next();
  } catch (err) {
    console.log('Error', err);
    let error = {
      log: 'Express error handler caught redisController.getErrLogs',
      message: { err: err },
    };
    return next(error);
  }
};

const getRedisTraces = async (req, res, next) => {
  //Set TableName
  const TableName = 'Traces';
  //Pull in logs from redis
  try {
    let data = await redisClient.get(TableName);
    if (data == null) {
      console.log('REDIS CACHE MISS');
      return next();
    } else {
      console.log('REDIS CACHE HIT');
      res.locals.redisTraces = JSON.parse(data);
      return next();
    }
  } catch (err) {
    console.log('Error', err);
    let error = {
      log: 'Express error handler caught redisController.getErrLogs',
      message: { err: err },
    };
    return next(error);
  }
};

const clearTraces = async (req, res, next) => {
  //Set TableName
  console.log('in clearTraces');
  const TableName = 'Traces';
  //Pull in logs from redis
  try {
    let data = await redisClient.del(TableName);
    return next();
  } catch (err) {
    console.log('Error', err);
    let error = {
      log: 'Express error handler caught redisController.clearTraces',
      message: { err: err },
    };
    return next(error);
  }
};

module.exports = { setLogs, getLogs, getErrLogs, getRedisTraces, clearTraces };

// { "logs" : [
//     {
//     "id" : 0,
//     "duration": 1.01,
//     "memoryUsed": 15,
//     "result": "success",
//     "name": "arbFunc"
// },
// {
//     "id" : 1,
//     "duration": 1.01,
//     "memoryUsed": 15,
//     "result": "error",
//     "name": "arbFunc"
// },
// {
//     "id" : 2,
//     "duration": 1.01,
//     "memoryUsed": 15,
//     "result": "error",
//     "name": "arbFunc"
// },
// {
//     "id" : 3,
//     "duration": 1.01,
//     "memoryUsed": 15,
//     "result": "error",
//     "name": "arbFunc"
// },
// {
//     "id" : 4,
//     "duration": 1.01,
//     "memoryUsed": 15,
//     "result": "success",
//     "name": "arbFunc"
// }
// ]
// }
