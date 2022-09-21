const { log } = require("console");
require('dotenv').config()

//use express to create a server
const express = require("express");
const app = express();
const port = 3000;
const mime = require("mime");
const fs = require("fs");
const dir = "public/";
const session = require("express-session");
const {MongoClient} = require('mongodb');

//use the session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//add passport 
const passport = require("passport");
//add github login
const GitHubStrategy = require("passport-github").Strategy;

//add passport to app
app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function addEntryTest(client, entry) {
  const result = await client.db("Webware-A3").collection("User-Data").insertOne(entry);
  console.log(`New entry created with the following id: ${result.insertedId}`);
}

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await  listDatabases(client);

        // await addEntryTest(client, {name: "Nathan", age: 21});
        // await addEntryTest(client, {name: "Jacob", age: 20});
        // await addEntryTest(client, {name: "John", age: 12});

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();

    }
}

main().catch(console.error);


//make the authentication with github and on success run the callback function
passport.use(
  new GitHubStrategy(
    {
      clientID: "b24afc1b91aef2c1d3d0",
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "http://localhost:3000/",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("Logged in!");
      console.log(profile);
      return cb(null, profile);
    }
    

  )
);




app.use('/login-go', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login'
}));



app.use(express.static("public"));

//add a entry to mongodb
const addEntry = async function (db, entry) {
  const collection = db.collection("entries");
  const result = await collection.insertOne(entry);
  return result;
};




const yahooFinance = require("yahoo-finance2").default;

const stocks = [
  { symbol: "tsla", price: 0, dateAdded: new Date() },
  { symbol: "amzn", price: 0, dateAdded: new Date() },
  { symbol: "f", price: 0, dateAdded: new Date() },
];

const handleGet = async function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    //send the index.html file
    // response.sendFile("index.html");
    response.sendFile(__dirname + "/public/index.html");
  } //check for a request for stocks
  else if (request.url === "/login") {
    response.sendFile(__dirname + "/public/login.html");
  }
  else if (request.url === "/stocks") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(stocks));
  }
  //url is /stock with a symbol as a query parameter
  else if (request.url.startsWith("/stock?")) {
    //get the symbol from the query parameter
    let symbol = request.url.split("=")[1];
    //get the stock data from the api
    let stockData = await getStockData(symbol);
    //if the stock is not found, return a 404
    if (stockData === undefined) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Stock not found");
    } else {
      //otherwise, return the stock data
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(stockData));
    }
  } else if (request.url.startsWith("/historical?")) {
    //get the symbol from the query parameter
    let symbol = request.url.split("=")[1];
    let historicalData = await getHistoricalData(symbol);
    if (historicalData === undefined) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Stock not found");
    }
    //otherwise, return the stock data
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(historicalData));
  } else {
    response.sendFile(__dirname + "/public" + request.url);
  }
};

const getHistoricalData = async function (symbol) {
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - 2);
  const pastDateString = pastDate.toISOString().split("T")[0];
  const queryOptions = { period1: pastDateString, interval: "1wk" };
  let result = undefined;
  try {
    result = await yahooFinance.historical(symbol, queryOptions);
  } catch (error) {
    console.log(error);
    return undefined;
  }

  return result;
};

const getStockData = async function (symbol) {
  let results = undefined;
  try {
    results = await yahooFinance.quote(symbol.toUpperCase());
  } catch (error) {
    console.log(error);
    return undefined;
  }
  return results;
};

const handlePost = async function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", async function () {
    let dataObject;
    try {
    dataObject = JSON.parse(dataString);
    } catch (error) {
      console.log("Error parsing JSON");
    }
    // console.log(dataObject);

    if (request.url === "/submit") {
      //if the stock is not already in the array, add it
      if (stocks.find((stock) => stock.symbol === dataObject.stockinput)) {
        console.log("stock already in array");
        response.writeHead(406, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({ message: "ERROR: stock already in array" })
        );
      } else if (dataObject.stockinput !== "") {
        //check that the stock is valid
        let stockData = await getStockData(dataObject.stockinput);
        //test getting historical data
        let historicalData = await getHistoricalData(dataObject.stockinput);

        if (stockData === undefined || historicalData === undefined) {
          console.log("stock not found");
          response.writeHead(404, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "ERROR: stock not found" }));
        } else {
          //add the stock to the array with the date right now
          const newStock = {
            symbol: dataObject.stockinput.toLowerCase(),
            price: stockData.regularMarketPrice, //derived field
            dateAdded: new Date(),
          };
          stocks.push(newStock);

          response.writeHead(200, "OK", { "Content-Type": "application/json" });
          response.end(JSON.stringify(newStock));
        }
      }
    } else if (request.url === "/delete") {
      //find the stock in the array
      let stock = stocks.find(
        (stock) => stock.symbol === dataObject.stockinput
      );
      //if the stock is in the array, remove it
      if (stock) {
        stocks.splice(stocks.indexOf(stock), 1);
        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end("Removed stock from array");
      } else {
        response.writeHead(404, "Not Found", { "Content-Type": "text/plain" });
        response.end("Stock not found in array");
      }
    } 
    // else if (request.url === "/login-go"){
    //   console.log("login-go");
    //   //use passport to authenticate the user
    //   passport.authenticate("github", { 
    //     successRedirect: "/",
    //     failureRedirect: "/login"
    //   })(request, response);
    // }
  });
};

//if there is any type of get request, call the handleGet function with the request and response as parameters
app.get("*", handleGet);

//if there is any type of post request, call the handlePost function with the request and response as parameters
app.post("*", handlePost);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
