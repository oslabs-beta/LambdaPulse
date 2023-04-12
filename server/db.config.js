// import AWS from 'aws-sdk';
require('dotenv').config();
// console.log(process.env.AWS_ACCESS_KEY_ID)
// console.log(process.env.AWS_SECRET_ACCESS_KEY)
const AWS = require('aws-sdk');
// import { Module } from 'module';
// const awsconfig = new AWS.Config({
    AWS.config.update({
    region: 'us-east-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    
})
const db = new AWS.DynamoDB.DocumentClient();
const Table = 'Testing';

module.exports = {
    db,
    Table
}  