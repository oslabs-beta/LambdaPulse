const { AssumeRoleCommand } = require('@aws-sdk/client-sts');
const { stsClient } = require('./sts_client.js');

const getCredentials = async (userArn) => {
  console.log('in getCredentials');
  const assumerRoleParams = {
    RoleArn: userArn,
    RoleSessionName: 'TestSession',
  };
  try {
    const data = await stsClient.send(new AssumeRoleCommand(assumerRoleParams));
    const temporaryCredentials = {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
    };
    console.log('no errors detected');
    // return { credentials: temporaryCredentials, user_Arn: userArn };
    return temporaryCredentials;
  } catch (err) {
    console.log('Error in getCreds');
    console.log(err);
  }
};
const getCredentialsForAllArns = async (array_of_arns) => {
  const temporary_creds = [];
  try {
    // gets credentials for individual users
    for (const arn of array_of_arns) {
      const result = await getCredentials(arn);
      temporary_creds.push(result);
    }
  } catch (err) {
    console.log(err);
  }
  return temporary_creds;
};

module.exports = { getCredentials, getCredentialsForAllArns };
