import express from "express";
import * as mongodb from "mongodb";
import { promises as fs } from "fs";

process.env.PORT = '3000';

// get mongodb credentails from mongodb.config.json
const credentials = JSON.parse(await fs.readFile('./mongodb.config.json', 'utf-8'));
process.env.USER = 'cjacobson32';
process.env.PASS = credentials.password;
process.env.HOST = 'canvas.ng8r68j.mongodb.net/?retryWrites=true&w=majority';
const uri = "mongodb+srv://"+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST

// Setup static express
const app = express(),
    dreams: string[] = [];

app.use(express.static('src'));
app.use(express.json());

// Setup client and connection
// @ts-ignore
const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection: mongodb.Collection<mongodb.Document> | null = null

// Connect to Paths database
client.connect()
    .then( () => {
        return client.db( 'Canvas' ).collection('Paths');
    })
    .then( __collection => {
        collection = __collection;
        return collection!.find({ }).toArray();
    })
    .then(console.log);

// route to get all docs
app.get( '/canvas', (req,res) => {
    if( collection !== null ) {
        // get array and pass to res.json
        collection!.find({ }).toArray().then(result => res.json(result));
    }
});

app.post('/submit', (req, res) => {
    dreams.push(req.body.newdream);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dreams));
});

app.listen( process.env.PORT );
