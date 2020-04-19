const express = require("express")
const http = require("http")
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = "localhost";
const port = 3001;

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/ponyExpress';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });



const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

const requestRouter = require('./routes/requestRouter');
app.use('/requests', requestRouter);

const userinfoRouter = require('./routes/userInfoRouter');
app.use('/userInfo', userinfoRouter);

const updatesRouter = require('./routes/updatesRouter');
app.use('/updates', updatesRouter);


// var database, collection;

// app.post("/:locationId", (request, response) => {
//   collection.insert({"id":request.params.locationId, "name":request.body.name, "joinTime": request.body.joinTime}, (error, result) => {
//       if(error) {
//           return response.status(500).send(error);
//       }
//       response.send(result.result);
//   });
// });

// app.get("/:locationId", (request, response) => {
//   collection.find({"id":request.params.locationId}).toArray((error, result) => {
//       if(error) {
//           return response.status(500).send(error);
//       }
//       response.send(result);
//   });
// });

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  // MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
  //   if(error) {
  //       throw error;
  //   }
  //   database = client.db("map");
  //   collection = database.collection("locationInfo");
  //   console.log("Connected to `" + "map" + "`!");
// });
});