

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shanestevenz:creeper101@cluster0.dsec9fr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let mongodb;
let collection;



function connect() {

    client.connect()
        .then(() => {
            mongodb = client.db('a3_data')
            console.log("DB: Connecting to Database")
        })
}

function getDB() {
    return mongodb;
}
function close() {
    mongodb.close();
}

module.exports = {
    connect,
    getDB,
    close
};