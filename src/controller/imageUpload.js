import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
export default({ config, db }) => {
  let api = Router();

aws.config.update({
    secretAccessKey: 'r2c1mJdVGCWAjKT9AQvz14oTF04sZL6Jhr6dfddq',
    accessKeyId: 'AKIAIKZWXXW4HF5QB65Q',
     region: 'sa-east-1'
});


  var  s3 = new aws.S3();
  var file_saved_name;

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'rentophilaimages',
        key: function (req, file, cb) {
            console.log(file);
            file_saved_name= Date.now()+"_"+file.originalname;
            cb(null,file_saved_name); //use Date.now() for unique file keys
        }
    })
});


api.post('/', upload.any(), function (req, res, next) {
    res.send(file_saved_name);
});

  return api;
}