const express = require("express");
const passport = require("passport");
const path = require("path");
const Authroute = require("./route/auth-route");
var session = require("express-session");
const passportSetup = require("./config/passportSetup");
const client = require("./config/mongodbSetup");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
var cookieParser = require('cookie-parser')
const ApplicationRouter = require("./route/application-route");
const { stringify } = require("querystring");
var responseTime = require('response-time');
app = express();

app.set("view engine", "ejs");

app.use(
  cookieSession({
    keys: ["kkk"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "html")));

app.use("/auth", Authroute);
app.use("/application", ApplicationRouter);

app.use(cookieParser())
app.use(responseTime())

const extractor = (req, res, next) => {
  let dataString = "";

  req.on("data", function (data) {
    dataString += data;
  });

  req.on("end", function () {
    req.json = JSON.stringify(dataString);
    // advance to next middleware or route
    next();
  });
};
app.use(extractor);

const DB = keys.Database.Database;
const Collection = keys.Database.Collection_Data;
app.post("/Done", (req, res) => {
  const user = req.user.username;
  const Q = JSON.parse(req.json);
  const Q1 = JSON.parse(Q);
  const Q_name = Q1.Body;
  UpdateDone(Q_name, DB, Collection, user).then((result) => {
    res.end("Updata sucess!");
  });
});

async function UpdateDone(Q_name, DB, Collection, user) {
  try {
    console.log(`Connecting to ${DB}, Collection: ${Collection}`);
    const database = client.db(DB);
    const quests = database.collection(Collection);
    console.log(`Connection Success!`);
    const Quest = await quests.findOneAndUpdate(
      { Quest: Q_name, user: user },
      { $set: { Done: true } }
    );
    return Quest;
  } catch {
    console.log("err happened");
  }
}

app.post("/NotDone", (req, res) => {
  const user = req.user.username;
  const Q = JSON.parse(req.json);
  const Q1 = JSON.parse(Q);
  const Q_name = Q1.Body;
  UpdateNotDone(Q_name, DB, Collection, user).then((result) => {
    res.end("Updata sucess!");
  });
});

async function UpdateNotDone(Q_name, DB, Collection, user) {
  try {
    console.log(`Connecting to ${DB}, Collection: ${Collection}`);
    const database = client.db(DB);
    const quests = database.collection(Collection);
    console.log(`Connection Success!`);
    const Quest = await quests.findOneAndUpdate(
      { Quest: Q_name, user: user },
      { $set: { Done: false } }
    );
    return Quest;
  } catch {
    console.log("err happened");
  }
}

app.get("/GetQuest/:Categ", (req, res) => {
  const Categ = req.params.Categ;
  const user = req.user.username;
  console.log(`Trying to fetch Category: ${Categ}`);
  GetRandomeQuest(Categ, DB, Collection, user)
    .then((results) => {
      results.forEach((result) => {
        res.end(JSON.stringify(result));
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

async function GetRandomeQuest(Categ, DB, Collection, user) {
  try {
    console.log(`Connecting to ${DB}, Collection: ${Collection}`);
    const database = client.db(DB);
    const quests = database.collection(Collection);
    console.log(`Connection Success!`);
    const query = [
      { $match:  { $or: [ { Category: Categ, user: user }, { is: 'example' } ] } } ,
      { $sample: { size: 1 } },
    ];
    const Quest = await quests.aggregate(query);
    return Quest;
  } catch {
    console.log("err happened");
  }
}

app.post("/AddQuest", (req, res) => {
  const user = req.user.username;
  const Q = JSON.parse(req.json);
  const Q1 = JSON.parse(Q);
  const json = {
    Quest: Q1.Quest,
    Category: Q1.Category,
    user: req.user.usernamename,
  };
  Addone(DB, Collection, json, user);
  res.end("sent");
});

async function Addone(DB, Collection, item, user) {
  const Quest = item.Quest;
  const Category = item.Category;
  const F = false;
  try {
    console.log(`Connecting to ${DB}, Collection: ${Collection}`);
    const database = client.db(DB);
    const quests = database.collection(Collection);
    console.log(`Connection Success!`);

    const doc = { Quest: Quest, Category: Category, Done: F, user: user };
    const result = await quests.insertOne(doc);
    console.log(`Doc with new ID: ${result.insertedId} added`);
  } catch {
    console.log("error occure while adding a document to database");
  }
}

app.post("/DeleteQuest", (req, res) => {
  const user = req.user.username;
  const Q = JSON.parse(req.json);
  const Q1 = JSON.parse(Q);
  const json = { Quest: Q1.Quest, Category: Q1.Category };
  DeleteOne(DB, Collection, json, user);
  res.end("deleted");
});

async function DeleteOne(DB, Collection, item, user) {
  const Quest = item.Quest;
  try {
    console.log(`Connecting to ${DB}, Collection: ${Collection}`);
    const database = client.db(DB);
    const quests = database.collection(Collection);
    console.log(`Connection Success!`);

    const doc = { Quest: Quest, user: user };
    const result = await quests.deleteOne(doc);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch {
    console.log("error occure while Deleting a document to database");
  }
}

app.get("/GetAll", async function GetAllSend(req, res) {
    console.log('Cookies: ', req.cookies)
  const user = req.user.username;
  console.log("Get Database!");
  console.log(`Connecting to ${DB}, Collection: ${Collection}`);
  const database = client.db(DB);
  const quests = database.collection(Collection);
  console.log(`Connection Success!`);
  quests.find({ user: user }).toArray(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.end(JSON.stringify(result));
    }
  });
});

app.get('/GetUserInfo', async function GetAllSend(req, res) {
    console.log('Cookies: ', req.cookies)
  const user = req.user.username;
  console.log("Get Database!");
  console.log(`Connecting to ${DB}, Collection: Users`);
  const database = client.db(DB);
  const quests = database.collection('Users');
  console.log(`Connection Success!`);
  const User = await quests.findOne({ username: user });
  res.end(JSON.stringify(User));
})

PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
