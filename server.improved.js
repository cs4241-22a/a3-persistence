const express = require('express'),
  app = express(),
  serveStatic = require('serve-static'),
  bodyparser = require('body-parser'),
  cookieSession = require('cookie-session'),
  cookieParser = require('cookie-parser'),
  mongoose = require('mongoose'),
  GitHubStrategy = require('passport-github2').Strategy,
  passport = require('passport');

  require('dotenv').config();
  
  app.use(express.urlencoded({ extended:true }))
  app.use(cookieParser())
  app.use(passport.initialize());
  app.use(passport.session());
  app.use( cookie({
    name: 'session',
    keys: [process.env.KEY1, process.env.KEY2]
  }))
  app.use(serveStatic('public', {'index' : ['login.html']}))

let loginCollection = null
const uri = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PW+'@cluster0.vi6pcuz.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  loginCollection = client.db("a3database").collection("survey");
});


const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;


const appdata = [
  {
    responseNum: 1,
    name: "Cather",
    year: "Junior",
    sex: "Female",
    calories: 2500,
    fiber: 35,
    favoritefruit: "Watermelon",
  },
];
const deleteItem = function (jsonData) {
  //console.log(appdata);
  appdata.splice(jsonData["deletingResponse"], 1);
};
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/getResponses") {
    response.writeHeader(200, { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    //console.log(JSON.parse(dataString));
    if (request.url === "/submit") {
      appdata.push(JSON.parse(dataString));
    } else if (request.url === "/delete") {
      console.log(JSON.parse(dataString));
      deleteItem(JSON.parse(dataString));
    }
    //console.log(appdata);
    // ... do something with the data here!!!
    for (let i = 0; i < appdata.length; i++) {
      let response = appdata[i];
      response.fiber = amountFiber(response.calories);
    }
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end();
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);

