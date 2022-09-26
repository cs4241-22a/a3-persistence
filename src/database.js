const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://AidanMulcahey101:Fenway98$$@cluster0.9dpxmus.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client