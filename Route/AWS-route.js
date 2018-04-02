// 'use strict';
// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

// const path = require('path');
// const multer = require('multer');
// const upload = multer({dest: 'uploads/'});

// router.post('/upload', upload.single('picute'), function(req, res, next){
//   let ext = path.extname(req.file.originalname);
//   let params = {
//     ACL: 'public-read',
//     Bucket: process.env.AWS_Bucket,
//     Key:`$req.file.filename${ext}`,
//     Body: fs.createReadStream(req.file.path)
//   };
//   s3.upload(params,(err, s3Data) => {
//     res.send(s3Data);
//   });
// }); 