const { STSClient } = require('@aws-sdk/client-sts');
const dotenv = require('dotenv');
dotenv.config();

const region = 'us-east-1';
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const stsClient = new STSClient({ region, credentials });

module.exports = { stsClient };
