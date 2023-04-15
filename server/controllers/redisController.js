const { db, Logs } = require('../db.config.js')
const Redis = require('redis');
const redisClient = Redis.createClient();
redisClient.connect();
redisClient.on('error', (err) => {
    console.error(err);
  });

const setLogs = (req,res,next) => {
    //Set TableName
    const TableName = Logs;
    //Pull in logs from body
    const { logs } = req.body;
    redisClient.set(TableName, JSON.stringify(logs));
    console.log("set in redis?")
    try {
        //adding logs to the database, may need to set expiration,(TTL)
        for (let i = 0; i < logs.length; i++) {
            let Item = {
                log_id: logs[i].id,
                duration: logs[i].duration,
                memoryUsed: logs[i].memoryUsed,
                result: logs[i].result,
                name: logs[i].name
            }
            db.put({TableName: TableName, Item: Item}).promise();
        }
        console.log('in try');
        return next();
    } catch(err) {
        console.log('Error', err)
        let error = {
            log: 'Express error handler caught userController.setLogs',
            message: { err: err}
        }
        return next(error)
    }
}
const getLogs = async (req,res,next) => {
    //Set TableName
    const TableName = Logs;
    //Pull in logs from redis
    try {
        let data = await redisClient.get(Logs);
        res.locals.logs = JSON.parse(data);
        return next()
    } catch(err) {
        console.log('Error', err)
        let error = {
            log: 'Express error handler caught userController.getLogs',
            message: { err: err}
        }
        return next(error)
    }
}
const getErrLogs = async (req,res,next) => {
    //Set TableName
    const TableName = Logs;
    //Pull in logs from redis
    try {
        let data = await redisClient.get(Logs);
        res.locals.logs = JSON.parse(data).filter(elem => elem.result == "error");
        return next()
    } catch(err) {
        console.log('Error', err)
        let error = {
            log: 'Express error handler caught userController.getLogs',
            message: { err: err}
        }
        return next(error)
    }
}


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

module.exports = { setLogs, getLogs, getErrLogs }