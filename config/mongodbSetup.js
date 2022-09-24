const { MongoClient, ServerApiVersion } = require("mongodb");
const keys = require("./keys");

const uri = `mongodb+srv://${keys.Database.clientID}:${keys.Database.clientSecret}@amazon0.ul5uj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
    console.log(err)
});

module.exports = client;
