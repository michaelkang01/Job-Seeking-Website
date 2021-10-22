// const { EnvironmentCredentials } = require('aws-sdk');
import { S3 } from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import crypto from "crypto";

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRETACCESS_KEY = process.env.S3_SECRETACCESS_KEY;
const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION;

const s3 = new S3({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRETACCESS_KEY,
  region: S3_BUCKET_REGION,
});

const uploadResume = (bucketID) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketID,
      metadata: function (req, file, cb) {
        cb(null, { filename: file.fieldname });
      },
      key: function (req, file, cb) {
        // create dynamic file name based on user info or timestamp?
        cb(
          null,
          `resume-${Date.now()}-${crypto.randomBytes(64).toString("hex")}.pdf`
        );
      },
    }),
  });

export function setResume(req, res, next) {
  console.log(req.files);
  const uploadSingle = uploadResume("c01steadfastsols").single("resume-upload");

  uploadSingle(req, res, async (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });
    // use updateOne to update the resume url field in mongodb document
    db.jobseekerprofiles.updateOne(
      { email: res.locals.authData.email },
      { $set: { resumeUrl: req.file.location } }
    ); // update the resumeUrl field in db
    console.log(req.file);
    res.status(200).json({ data: req.file.location });
  });
}

// retrieve any resume by https://c01steadfastsols.s3.us-east-2.amazonaws.com/{resume-name}
