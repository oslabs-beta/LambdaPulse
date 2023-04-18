// import AWS from 'aws-sdk';
require('dotenv').config();
// console.log(process.env.AWS_ACCESS_KEY_ID)
// console.log(process.env.AWS_SECRET_ACCESS_KEY)
// const AWS = require('aws-sdk');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const {
  DescribeTableCommand,
  CreateTableCommand,
} = require('@aws-sdk/client-dynamodb');

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
const describeTableParams = {
  TableName: Users,
};

const createTableParams = {
    TableName: Users,
    AttributeDefinitions: [
      {
        AttributeName: 'user_id',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'user_id',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };
const describeTableCommand = new DescribeTableCommand(describeTableParams);
const createTableCommand = new CreateTableCommand(createTableParams);

dynamoDBClient
  .send(describeTableCommand)
  .then((data) => {
    console.log('Existing table:', data);
  })
  .catch((err) => {
    if (err.name === 'ResourceNotFoundException') {
      console.log('Table not found, creating a new table');
      dynamoDBClient
        .send(createTableCommand)
        .then((data) => {
          console.log('Creating Table:', Users);
          console.log(data);
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    } else {
      console.log('Error:', err);
    }
  });
//create logs table
// const describeTableParamsLogs = {
//     TableName: Logs
// }
// const createTableParamsLogs = {
//     TableName: Logs,
//     AttributeDefinitions :[
//         {
//             AttributeName: "log_id",
//             AttributeType: "N"
//         }
//     ],
//     KeySchema:[
//         {
//             AttributeName: 'log_id',
//             KeyType: 'HASH'
//         }
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 15,
//         WriteCapacityUnits: 15
//     }
// }
// dynamodb.describeTable(describeTableParamsLogs, function(err,data) {
//     if(err) {
//         console.log(err);
//         dynamodb.createTable(createTableParamsLogs, function(err,data) {
//             if(err) {
//                 console.log(err)
//             } else {
//                 console.log('Creating Table: ', Users );
//                 console.log(data);
//             }
//         });
//     } else {
//         console.log('existing table')
//         console.log(data);
//     }
// });

module.exports = {
  db,
  Users,
  Logs,
  stsClient,
};
