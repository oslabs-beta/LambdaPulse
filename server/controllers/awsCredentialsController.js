const { AssumeRoleCommand } = require('@aws-sdk/client-sts');
const { stsClient } = require('../db.config.js');

const awsCredentialsController = {};

awsCredentialsController.getCredentials = async (req, res, next) => {
  console.log('new requestt');
  const userRoleArn = process.env.USER_ROLE_ARN;
  console.log('req body: ',req.body)

  if (!userRoleArn) {
    return res.status(400).json({ message: 'User Role ARN is required.' });
  }

  const assumeRoleParams = {
    RoleArn: userRoleArn,
    RoleSessionName: 'TestSession',
  };

  try {
    const data = await stsClient.send(new AssumeRoleCommand(assumeRoleParams));
    const temporaryCredentials = {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
    };
    console.log('in awsCredentialsController')
    res.locals.awsCredentials = temporaryCredentials;
    console.log('aws creds', res.locals.awsCredentials)
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
