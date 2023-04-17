// import AWS from 'aws-sdk';
require('dotenv').config();
// console.log(process.env.AWS_ACCESS_KEY_ID)
// console.log(process.env.AWS_SECRET_ACCESS_KEY)
// const AWS = require('aws-sdk');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { STSClient } = require('@aws-sdk/client-sts');

// import { Module } from 'module';
// const awsconfig = new AWS.Config({

// AWS.config.update({
//   region: 'us-east-1',
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

const region = 'us-east-1';
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

// const db = new AWS.DynamoDB.DocumentClient();
// const dynamodb = new AWS.DynamoDB();
const dynamoDBClient = new DynamoDBClient({ region, credentials });
const db = DynamoDBDocument.from(dynamoDBClient);
const stsClient = new STSClient({ region, credentials });

const Users = 'Users';
const Logs = 'Logs';
/*
//create users table
const describeTableParams = {
    TableName: Users
}
const createTableParams = {
    TableName: Users,
    AttributeDefinitions :[
        {
            AttributeName: "user_id",
            AttributeType: "S"
        }
    ],
    KeySchema:[
        { 
            AttributeName: 'user_id',
            KeyType: 'HASH' 
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
}
dynamodb.describeTable(describeTableParams, function(err,data) {
    if(err) {
        console.log(err);
        dynamodb.createTable(createTableParams, function(err,data) {
            if(err) {
                console.log(err)
            } else {
                console.log('Creating Table: ', Users );
                console.log(data);
            }
        });
    } else {
        console.log('existing table')
        console.log(data);
    }
});

//create logs table
const describeTableParamsLogs = {
    TableName: Logs
}
const createTableParamsLogs = {
    TableName: Logs,
    AttributeDefinitions :[
        {
            AttributeName: "log_id",
            AttributeType: "N"
        }
    ],
    KeySchema:[
        { 
            AttributeName: 'log_id',
            KeyType: 'HASH' 
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 15,
        WriteCapacityUnits: 15
    }
}
dynamodb.describeTable(describeTableParamsLogs, function(err,data) {
    if(err) {
        console.log(err);
        dynamodb.createTable(createTableParamsLogs, function(err,data) {
            if(err) {
                console.log(err)
            } else {
                console.log('Creating Table: ', Users );
                console.log(data);
            }
        });
    } else {
        console.log('existing table')
        console.log(data);
    }
});
*/

module.exports = {
  db,
  Users,
  Logs,
  stsClient,
};
