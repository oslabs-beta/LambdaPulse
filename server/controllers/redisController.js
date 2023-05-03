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

module.exports = { getRedisTraces, clearTraces };