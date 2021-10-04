// const { EnvironmentCredentials } = require('aws-sdk');
import { S3 } from 'aws-sdk';
import multer from 'multer';
import multerS3 from "multer-s3";

const Seeker = require('../models/Seeker');

const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRETACCESS_KEY = process.env.S3_SECRETACCESS_KEY;
const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION;

const s3 = new S3({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRETACCESS_KEY,
    region: S3_BUCKET_REGION,
})

const uploadResume = (bucketID) => multer({
    storage: multerS3({
        s3,
        bucket: bucketID,
        metadata: function (req, file, cb) {
            cb(null, { filename: file.fieldname });
        },
        key: function(req, file, cb){
            // create dynamic file name based on user info or timestamp?
            cb(null, `resume-${Date.now()}.pdf`);
        },
    }),
});

export function setResume(req, res, next) {
    console.log(req.files);
    const uploadSingle = uploadResume("c01steadfastsols").single(
        'resume-upload'
    );
    
    uploadSingle(req, res, async(err) => {
        if(err) 
            return res.status(400).json({ success: false, message: err.message });
        
        await Seeker.updateOne( {resumeUrl: req.file.location })
        console.log(req.file);
        res.status(200).json({ data: req.file.location });
    });
};