# 401 Lab 18 Asset Management. Amazon Web Services. S3. Amber Kim

## Introduction
This is a simple node.js app with an Express Server that implements Restful API's, uses MongoDB with Mongoose for the database, and Amazon Web Services S3 for file storage.

## Technologies & Practices
* Node.js
* Express
* MongoDB
* Mongoose
* dotenv
* AWS SDK
* Multer
* Optional Jest for testing

## To Run This Application
Make sure you have your Mongo Daemon running.

Install all the dependencies as listed in the package.json. For a quick install run these commands in the lab-amber folder:
```
npm install -y
npm install
```

Run server.js. Some example tools and commands you can use:
```
node server.js
// for node

nodemon server.js
// if you have nodemon installed globally
```

Optional: Jest for testing.

## Mongoose Schema

### Post Schema
It takes these keys:
* title which is a String
* date which takes a date or you can leave default for Date.now
* content which takes a string
* imageUrl which also takes a string
```
{
  title: String,
  date: {type: Date, default: Date.now},
  content: String,
  imageUrl: String
}
```

## API End Points

### For GETting all the posts
The URL:
```
http://localhost:3000/api/posts
```
This will return all of the posts.

### For GETting one post 
The URL:
```
http://localhost:3000/api/posts?id=<a valid post id>
```

### For POSTing a new post
Fill in the form found at:
```
http://localhost:3000/
```