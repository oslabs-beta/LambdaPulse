const express = require('express'),
  PORT = 3000,
  app = express();
const cors = require('cors');
const userController = require('./controllers/userController');
const redisController = require('./controllers/redisController');
const awsCredentialsController = require('./controllers/awsCredentialsController');
const getTraceMiddleware = require('./aws_sdk/traceDetails');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.get('/api', (req, res) => {
  let data = 'hello';
  res.status(200).json(data);
});
app.post('/createUser', userController.createUser, (req, res) => {
  console.log('in create user');
  res.sendStatus(201);
});

app.post('/verifyUser', userController.verifyUser, (req, res) => {
  //successful login
  // res.redirect('homepage');
  res.sendStatus(200);
});

app.post('/setLogs', redisController.setLogs, (req, res) => {
  //successful login
  // res.redirect('homepage');
  res.sendStatus(200);
});

app.get(
  '/getTraces',
  redisController.getRedisTraces,
  awsCredentialsController.getCredentials,
  getTraceMiddleware.getSummary,
  getTraceMiddleware.getSegmentArray,
  getTraceMiddleware.sortSegments,
  (req, res) => {
    console.log('Sending this back to the frontend:', res.locals.nodes);
    res.status(200).json(res.locals.nodes);
  }
);

app.get('/clearTraces', redisController.clearTraces, (req, res) => {
  res.sendStatus(200);
});

app.get('/getLogs', redisController.getLogs, (req, res) => {
  //successful login
  // res.redirect('homepage');
  res.status(200).json(res.locals.logs);
});
app.get('/getErrLogs', redisController.getErrLogs, (req, res) => {
  //successful login
  // res.redirect('homepage');
  res.status(200).json(res.locals.logs);
});

//Route not found
app.use((req, res) => res.sendStatus(404));

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('Global error: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
