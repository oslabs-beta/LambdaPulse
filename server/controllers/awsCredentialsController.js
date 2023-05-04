const { AssumeRoleCommand } = require('@aws-sdk/client-sts');
const { stsClient } = require('../db.config.js');
const { query } = require('../db.config.js');

const awsCredentialsController = {};

// retrieve user's AWS Role ARN from the database.
awsCredentialsController.getCredentials = async (req, res, next) => {
  console.log('in getCredentials');
  if (res.locals.redisTraces != undefined) {
    return next();
  } 
  console.log('Received creds request at ' + Date.now());

  const roleResult = await query('SELECT role_arn FROM users WHERE _id = $1 ;', [res.locals.userId])
  const getRole = roleResult.rows[0].role_arn

  const userRoleArn = getRole;
  console.log('req body: ', req.body);

  if (!userRoleArn) {
    return res.status(400).json({ message: 'User Role ARN is required.' });
  }

  const assumeRoleParams = {
    RoleArn: userRoleArn,
    RoleSessionName: 'lambdaPulseSession',
  };
// assume the role specified by the Role ARN, create temp credentials
  try {
    const data = await stsClient.send(new AssumeRoleCommand(assumeRoleParams));
    const temporaryCredentials = {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
    };
    console.log('in awsCredentialsController');
    res.locals.awsCredentials = temporaryCredentials;
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
