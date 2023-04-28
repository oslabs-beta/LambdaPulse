require('dotenv').config();

const { Pool } = require('pg');

const { STSClient } = require('@aws-sdk/client-sts');

const PG_URI = process.env.PG_URI;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

const region = 'us-east-1';
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const stsClient = new STSClient({ region, credentials });

module.exports = {
  stsClient,
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
