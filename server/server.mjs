import express from "express";
import * as mongodb from "mongodb";
import { promises as fs } from "fs";
import paper from "paper";
process.env.PORT = '3000';
// get mongodb credentials from mongodb.config.json
const credentials = JSON.parse(await fs.readFile('./mongodb.config.json', 'utf-8'));
const uri = "mongodb+srv://" + credentials.username + ':' + credentials.password + '@' + credentials.host;
// Setup static express
const app = express(), paths = [];
paper.setup(new paper.Size(200, 100));
app.use(express.static('src'));
app.use(express.json());
// Setup client and connection
// @ts-ignore
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection = null;
// Connect to Paths database
client.connect()
    .then(() => {
    return client.db('Canvas').collection('Paths');
})
    .then(__collection => {
    collection = __collection;
    return collection.find({}).toArray();
})
    .then(console.log);
// route to get all docs
app.get('/canvas', (req, res) => {
    if (collection !== null) {
        // get array and pass to res.json
        collection.find({}).toArray().then(result => res.json(result));
    }
});
app.post('/draw', (req, res) => {
    const newPath = new paper.Path();
    newPath.importJSON(req.body);
    paths.push(newPath);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(paths));
});
app.listen(process.env.PORT);
