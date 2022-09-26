const http = require("http"),
  fs = require("fs"),
  mongodb = require("mongodb"),
  cookie = require("cookie-session"),
  mime = require("mime"),
  dir = "public/",
  express = require("express"),
  app = express(),
  bodyparser = require("body-parser"),
  port = 3000;

app.use( express.static('public') );
app.use( express.json() );
app.use(
  cookie({
    name: "session",
    keys: ["chocChip", "raisin"]
  })
);

const appdata = [];

const uri =
  "mongodb+srv://" +
  "Webware" +
  ":" +
  "Gompei" +
  "@cluster0.w12ouaz.mongodb.net/?retryWrites=true&w=majority";

//const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'Database' ).collection( 'Dates' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

  
// route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})
  
app.listen( 3000 )




// const server = http.createServer(function (request, response) {
//   if (request.method === "GET") {
//     handleGet(request, response);
//   } else if (request.method === "POST") {
//     handlePost(request, response);
//   }
// });

app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})


app.post( '/add', (req,res) => {
  // assumes only one object to insert
  collection.insertOne( req.body ).then( result => res.json( result ) )
})

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/remove', (req,res) => {
  collection
    .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
    .then( result => res.json( result ) )
})

app.post("/submit", bodyparser.json(), (request, response) => {
  console.log("login works?");
  
  collection
    .find
})


app.get("/getDates", bodyparser.json(), (request, response) => {
  console.log("getDates called!")
  collection.find({})
    .toArray()
    .then(result => {
      // let entries = result[0].stringify;
      console.log(result[0]);
      // console.log(entries);
      // console.log("entries^");
      response.json(result);
    });
});

/*then(async function (response) {
    let newData = await response.json();
    refreshInfo(newData);
    console.log(newData);*/

app.post("/logDates", bodyparser.json(), (request, response) => {
  collection
    .find({ usr: request.session.usr })
    .toArray()
    .then(result => {
      let entries = result[0].entries;
      entries.push({
        months: request.body.months,
        days: request.body.days,
        years: request.body.years
      });

      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { entries: entries } }
      );
      response.json(entries);
    });
});


















const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
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
    console.log(JSON.parse(dataString));


    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.write(JSON.stringify(appdata));

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

function getAge(dateString) {
  var ageInMS = new Date() - new Date(dateString);
  return Math.floor(ageInMS / 1000 / 60 / 60 / 24 / 365);
}

//server.listen(process.env.PORT || port);
