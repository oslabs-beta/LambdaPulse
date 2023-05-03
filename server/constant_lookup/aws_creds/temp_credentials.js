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
    // now its an array of objects with 2 properites id and role_arn
    for (const arn of array_of_arns) {
      // console.log(arn);
      const result = await getCredentials(arn.role_arn);
      const idAndCreds = {
        tempCreds: result,
        id: arn.id,
      };

      temporary_creds.push(idAndCreds);
    }
  } catch (err) {
    console.log(err);
  }
  return temporary_creds;
};

module.exports = { getCredentials, getCredentialsForAllArns };
