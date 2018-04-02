# Lab 18:  Image Uploads w/ AWS S3

### Author: Darcy Knore

### Description:<br>
This project creates a server that accepts file uploads, stores the file in Amazon Web Services (AWS) S3, and stores a reference to the S3 storage location in a local database.
<br>

<u>Project Features</u>:
-  Creation of an AWS Access Key and Secret that is stored in the .env file
-  A Mongoose model that represents a file type that you want to store on AWS S3
-  A test that uploads one of these files to your route
-  A reference to the uploaded file that is stored in database
-  Use of aws-sdk to assist with uploading
-  Use of multer to parse the file upload request

<br>

<u>Project Instructions</u>:<br>

Server endpoints: 
-  GET 1 car:  /api/photos/:_id
-  GET All Cars:  /api/photos
-  POST: /api/photos

<br>

### Architecture:
This project uses javascript, mongoose, MongoDB, express, body-parser, multer, aws-sdk, and AWS S3.  With fellow developers in mind, the application was built using a RESTful API, and a layout that was thoughtfully organized, easy to read, and able to be executed efficiently.

<br>

### Change Log
This application has not been launched.

### Credits and Collaborations