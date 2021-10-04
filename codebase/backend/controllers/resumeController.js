// const { EnvironmentCredentials } = require('aws-sdk');
const { EnvironmentCredentials } = require('aws-sdk');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require("multer-s3");

new aws.S3({
    accessKeyId: S3_ACCESS_KEY, //or process.env.S3_ACCESS_KEY ?
    secretAccessKey: S3_SECRETACCESS_KEY
})