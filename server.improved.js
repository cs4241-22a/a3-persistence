const { log } = require("console");
require("dotenv").config();

//use express to create a server
const express = require("express");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
const compression = require("compression");
const favicon = require("serve-favicon");
const port = 3000;
const mime = require("mime");
const fs = require("fs");
const dir = "public/";
const path = require("path");

const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const oneDay = 1000 * 60 * 60 * 24;

let loggedIn = false;
let stocks = [];
let user = null;

app.use(compression());

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//use the session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }, // 1 day
  })
);
const { MongoClient } = require("mongodb");

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// return a user from the database
async function getUser(client, username) {
  const result = await client
    .db("Webware-A3")
    .collection("User-Data")
    .findOne({ username: username });
  return result;
}

// make a new user in the database
async function addUser(client, username, password = null) {
  const result = await client
    .db("Webware-A3")
    .collection("User-Data")
    .insertOne({
      username: username,
      password: password,
      stocks: [],
    });
  return result;
}

async function startClient() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  }
}

startClient();

app.get("/logout", function (req, res, next) {
  loggedIn = false;
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/auth");
  });
});

app.get("/auth/error", (req, res) => res.send("Unknown Error"));

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/error" }),
  async function (req, res) {
    // console.log(req.user);

    username = req.user.username;
    // if the user is not in the database, add them
    let dbUser = await getUser(client, username);
    if (dbUser == null) {
      await addUser(client, username);
      dbUser = await getUser(client, username);
    }
    // set the user to the current user
    user = dbUser;
    stocks = user.stocks;
    loggedIn = true;
    //log the user
    console.log(user);

    // Successful authentication,
    res.redirect("/");
  }
);

// /auth/custom
// attemts to log a user in given a username and password
app.post("/auth/custom", async function (req, res) {
  //get the username and password from the request
  //log the request
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  //if the username and password are not empty
  if (username && password) {
    //get the user from the database
    let dbUser = await getUser(client, username);
    //if the user is not in the database, report an error
    if (dbUser == null) {
      //error is in format {message : "error message"}
      console.log("User not found");
      res.status(401).json({ message: "User not found. Retry or register" });
    } else {
      // check the password
      if (
        dbUser.password &&
        dbUser.password.length > 0 &&
        dbUser.password == password
      ) {
        //set the user to the current user
        user = dbUser;
        stocks = user.stocks;
        loggedIn = true;

        //log the user
        console.log(user);
        // Successful authentication,
        res.status(200).json({ message: "Login success" });
      } else {
        //error is in format {message : "error message"}
        console.log("Password is incorrect");
        res.status(401).json({ message: "Password is incorrect" });
      }
    }
  } else {
    //error is in format {message : "error message"}
    console.log("Username or password is empty");
    res.status(401).json({ message: "Username or password is empty" });
  }
});

app.post("/auth/register", async function (req, res) {
  //get the username and password from the request
  //log the request
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  //if the username and password are not empty
  if (username && password) {
    //get the user from the database
    let dbUser = await getUser(client, username);
    //if the user is already in the database, report an error
    if (dbUser != null) {
      //error is in format {message : "error message"}
      console.log("User already exists");
      res.status(401).json({ message: "User already exists" });
    } else {
      //add the user to the database
      await addUser(client, username, password);
      //get the user from the database
      dbUser = await getUser(client, username);
      //set the user to the current user
      user = dbUser;
      stocks = user.stocks;
      //log the user
      console.log(user);
      // Successful authentication,
      loggedIn = true;

      res.status(200).json({ message: "Login success" });
    }
  } else {
    //error is in format {message : "error message"}
    console.log("Username or password is empty");
    res.status(401).json({ message: "Username or password is empty" });
  }
});

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

const yahooFinance = require("yahoo-finance2").default;

app.get("/", (req, res) => {
  if (loggedIn) {
    res.sendFile(__dirname + "/public/index.html");
  } else {
    res.redirect("/auth");
  }
});

app.get("/auth", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/stocks", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(stocks));
});

app.get("/stock", (req, res) => {
  let symbol = req.query.ticker;
  getStockData(symbol).then((stockData) => {
    if (stockData === undefined) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Stock not found");
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stockData));
    }
  });
});

app.get("/historical", (req, res) => {
  let symbol = req.query.ticker;
  getHistoricalData(symbol).then((historicalData) => {
    if (historicalData === undefined) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Stock not found");
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(historicalData));
    }
  });
});

app.get("/user", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
});

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

async function updateUsersStocks(newStockArr) {
  await client
    .db("Webware-A3")
    .collection("User-Data")
    .updateOne({ username: user.username }, { $set: { stocks: newStockArr } });
}

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
            shares: dataObject.sharesinput,
          };
          stocks.push(newStock);

          //set the stock array in the database
          updateUsersStocks(stocks);

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
        //set the stock array in the database
        updateUsersStocks(stocks);
        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end("Removed stock from array");
      } else {
        response.writeHead(404, "Not Found", { "Content-Type": "text/plain" });
        response.end("Stock not found in array");
      }
    } else if (request.url === "/updateShares") {
      //update the shares of the stock to the new value in the database and array
      //new value and ticker are in the body of the request
      let stock = stocks.find((stock) => stock.symbol === dataObject.symbol);
      if (stock) {
        stock.shares = dataObject.shares;
        //set the stock array in the database
        updateUsersStocks(stocks);
        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end("Updated shares");
      } else {
        response.writeHead(404, "Not Found", { "Content-Type": "text/plain" });
        response.end("Stock not found in array");
      }
    }
  });
};

//if there is any type of post request, call the handlePost function with the request and response as parameters
app.post("*", handlePost);

//any other request, send the file
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public" + req.url);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
