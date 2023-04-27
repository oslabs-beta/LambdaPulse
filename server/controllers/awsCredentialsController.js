const { AssumeRoleCommand } = require('@aws-sdk/client-sts');
const { stsClient } = require('../db.config.js');
const { query } = require('../db.config.js');

const awsCredentialsController = {};

awsCredentialsController.getCredentials = async (req, res, next) => {
  console.log('in getCredentials');
  if (res.locals.redisTraces != undefined) {
    return next();
  } 
  console.log('Received creds request at ' + Date.now());
  //use this: res.locals.userId to find user's ARN
  //SELECT user.role_ARN where user.id = res.locals.userID
  const roleResult = await query('SELECT role_arn FROM users WHERE _id = $1 ;', [res.locals.userId])
  console.log('this is roleResult in AWS credentials', roleResult)
  const getRole = roleResult.rows.map(row => row.role_arn)[0]
  console.log('this is getRole in AWS credentials', getRole)

  const userRoleArn = getRole;
  console.log('req body: ', req.body);

  if (!userRoleArn) {
    return res.status(400).json({ message: 'User Role ARN is required.' });
  }

  const assumeRoleParams = {
    RoleArn: userRoleArn,
    RoleSessionName: 'lambdaPulseSession',
  };

  try {
    const data = await stsClient.send(new AssumeRoleCommand(assumeRoleParams));
    const temporaryCredentials = {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
    };
    console.log('in awsCredentialsController');
    res.locals.awsCredentials = temporaryCredentials;
    console.log('aws creds', res.locals.awsCredentials);
    return next();
  } catch (err) {
    console.error('Error assuming role:', err);
    let error = {
      log: 'Express error handler caught awsCredentialsController.getCredentials',
      message: { err: err },
    };
    return next(error);
  }
};

module.exports = awsCredentialsController;
