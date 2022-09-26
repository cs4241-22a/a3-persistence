const mime = require( 'mime' );
const fs   = require( 'fs' );
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const app = express();

var favicon = require("serve-favicon");
var path = require("path");


app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use(express.static("public"));
app.use(express.json());


const uri = "mongodb+srv://jackie:lopez@cluster0.rvsymoi.mongodb.net/?retryWrites=true&w=majority"

const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });

let userColl = null;
let user = null;

client.connect(err => {
  userColl = client.db("Museum").collection("Registration");
});

app.post("/login", bodyParser.json(), function(req, res) {
  userColl
    .find({ username: req.body.username, password: req.body.password })
    .toArray()
    .then(result => res.json(result));
  user = req.body.username;
});

app.post("/register", bodyParser.json(), function(req, res) {
  userColl
    .insertOne(req.body)
    .then(insertResponse => userColl.findOne(insertResponse.insertedId))
    .then(findResponse => res.json(findResponse));
  user = req.body.username;
});

app.get("/loggedin", (req, res) => {
  res.sendFile(__dirname + "/views/secondPage.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});



const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
  //  console.log( JSON.parse( dataString ) )

     // ... do something with the data here!!!
    if(dataString.slice(0,4) === "EDIT")
    {
      let rowNum = parseInt(dataString.slice(4,5))
      dataString = dataString.slice(5)
      app[rowNum-1] = JSON.parse( dataString )
    } 
    else if(dataString.slice(0,6) === "DELETE")
    {
      let rowNum = parseInt(dataString.slice(6,7))
      app.splice(rowNum - 1, 1)
    } 
    else if (dataString === "GETDATA"){
    } 
    else 
    {
      app.push(JSON.parse( dataString ))
    }
    app.forEach( element => appointmentDate(element))

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify( app ))
  })
}

const sendFile = function( response, filename ) {
const type = mime.getType( filename ) 
   fs.readFile( filename, function( err, content ) {
  // if the error = null, then we've loaded the file successfully
     if( err === null ) {
  // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )
     }else{
  // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

const appointmentDate = function(data){
  let current = new Date()
       const currentYear = current.getFullYear()
       const currentMonth = current.getMonth() + 1
       const currentDate = current.getDate()
       const currentHour = current.getHours()
       const currentMinute = current.getMinutes()
       const visitYear = parseInt(data.appointment.slice(0, 4))
       const visitMonth = parseInt(data.appointment.slice(5, 7))
       const visitDay = parseInt(data.appointment.slice(8, 10))
       const visitHour = parseInt(data.appointment.slice(11, 13))
       const visitMinute = parseInt(data.appointment.slice(14, 16))

//find the difference between the current __ and present __
  let timeDifference = (((((visitYear - currentYear) * 12 +  visitMonth - currentMonth) * 30 + visitDay - currentDate) * 24 + visitHour - currentHour) * 60 + visitMinute - currentMinute)
  
  if(timeDifference < 0){
    data.visitTimeLeft = "Visit is over"
  } else {

      let minutesLeft = timeDifference % 60
      //rounds down and returns the largest integer less than or equal to a given number.
        const hoursLeft = Math.floor(timeDifference / 60) % 24
        const daysLeft = Math.floor(timeDifference / 60 / 24) % 30
        const monthsLeft = Math.floor(timeDifference / 60 / 24 / 30) % 12
        const yearsLeft =  Math.floor(timeDifference / 60 / 24 / 30 / 12)
        const display = "Time Remaining: "

      display += yearsLeft > 0 ? yearsLeft + " years " : ""
      display += monthsLeft > 0 ? monthsLeft + " months " : ""
      display += daysLeft > 0 ? daysLeft + " days " : ""
      display += hoursLeft > 0 ? hoursLeft + " hours " : ""
      display += minutesLeft > 0 ? minutesLeft + " minutes" : ""

      
    data.visitTimeLeft = display
  }
  
}


app.listen(3000, function() {
  console.log("Listening on port 3000...");
});



