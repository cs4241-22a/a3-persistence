const express = require( 'express' ),
    app = express()

require('dotenv').config()

let appdata = [];


// ---
// Middleware
// ---
app.use( (req,res,next) => {
  console.log( 'url:', req.url )
  next()
})
app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) )
app.use( express.json() )


// ---
// ROUTES
// ---

// todo handle GET?
// app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )

// handle POST
// todo, make definitive routes for /submit and /edit
app.post( '/*', (req, res) => {
  handlePost(req, res)
})


// todo DB stuff
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://rvrx:<password>@cluster0.6tugoyu.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

console.log("SERVER.IMPROVED.JS Connecting to DB")
client.connect()
    .then( () => {
      // will only create collection if it doesn't exist
      return client.db( 'db0' ).collection( 'collection1' )
    })
    .then( collection => {
      // blank query returns all documents
      return collection.find({ }).toArray()
    })
    .then( sync_appdata_with_db )

/**
 * Uses DB as source of truth to sync user data
 * @param db_array
 */
function sync_appdata_with_db(db_array) {
  console.warn(db_array)
  appdata = db_array
}


/**
 * Helper function for any DB operations
 * @param func function to call on the collection
 * @param user the DB "collection"
 */
function connect_to_db_and_run_on_collection_for_given_user(func, user = 'collection1') {
  client.connect()
      .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'db0' ).collection( user )
      })
      .then( collection => {
        func(collection)
      })
}

app.listen( process.env.PORT || 3000 )

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    console.log(JSON.parse(dataString));

    // ... do something with the data here!!!
    const parsedDataString = JSON.parse(dataString);

    if (parsedDataString["action"] === "new") {
      console.log("[server]: NEW REQ");
      function guidGenerator() {
        const S4 = function () {
          return (((1 + Math.random()) * 0x10000) | 0)
            .toString(16)
            .substring(1);
        };
        return (
          S4() +
          S4() +
          "-" +
          S4() +
          "-" +
          S4() +
          "-" +
          S4() +
          "-" +
          S4() +
          S4() +
          S4()
        );
      }
      const due_date = new Date();
      due_date.setDate(due_date.getDate() + parseInt(parsedDataString["days_to_complete"]))
      const new_task = {
        task: parsedDataString["task"],
        status: 0,
        other: due_date,
        guid: guidGenerator(),
      }
      appdata.push(new_task);
      // push to DB
      connect_to_db_and_run_on_collection_for_given_user(function (collection) {
        collection.insertOne(new_task).then(console.log)
      })
    } else if (parsedDataString["action"] === "edit") {
      // swap status for this GUID
      console.log("[server]: MODIFY REQ");
      const isSameGUID = (element) =>
        element["guid"] === parsedDataString["task_guid"];
      const foundTaskIndex = appdata.findIndex(isSameGUID); // find appdata with same guid
      appdata[foundTaskIndex]["status"] = 1 - appdata[foundTaskIndex]["status"]; // flip status
      // flip status in DB
      connect_to_db_and_run_on_collection_for_given_user(function (collection) {
        collection.updateOne(
            { guid: parsedDataString["task_guid"] },
            { $set: { 'status': appdata[foundTaskIndex]["status"] } }
        );
      })
    } else if (parsedDataString["action"] === "delete") {
      console.log("[server] DEL REQ");
      appdata = appdata.filter(
        (item) => item["guid"] !== parsedDataString["task_guid"]
      );
      // delete from DB
      connect_to_db_and_run_on_collection_for_given_user(function (collection) {
        collection.deleteOne({ guid: parsedDataString["task_guid"] })
      })
    } else console.error("[server]: Unknown action type");

    console.warn("current appdata:");
    console.warn(appdata);

    response.writeHead( 200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(appdata));
  });
};
