import express from "express";
import * as mongodb from "mongodb";
import { promises as fs } from "fs";
import {sUserPath} from "../src/js/UserPath";

process.env.PORT = '3000';

// get mongodb credentials from mongodb.config.json
const credentials = JSON.parse(await fs.readFile('./mongodb.config.json', 'utf-8'));
const uri = "mongodb+srv://"+credentials.username+':'+credentials.password+'@'+credentials.host;

// Setup static express
const app = express();

app.use(express.static('src'));
app.use(express.json());

// Setup client and connection
// @ts-ignore
const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let canvasCollection: mongodb.Collection<mongodb.Document> | null = null


// Connect to Paths database
client.connect()
	.then( () => {
		return client.db( 'Canvas' ).collection('Paths');
	})
	.then( _collection => {
		canvasCollection = _collection;
		return _collection.find({}).toArray();
	})
	.then(console.log);

// route to get all docs
app.get( '/canvas', (req,res) => {
	canvasCollection?.find({}).toArray()
		.then(paths => {
            res.json(paths);
		});
});

app.post('/draw', (req, res) => {
	const newPath = req.body as sUserPath;

	// Push to MongoDB
	canvasCollection?.insertOne(newPath)
		.then(result => {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			return canvasCollection?.find({}).toArray();
		})
		.then(paths => {
			res.end(paths);
		})
});

app.delete('/clear', (req, res) => {
	const auth = req.body as {userID: string, password: string};

	// Push to MongoDB
	canvasCollection?.deleteMany({user: auth.userID})
		.then(result => {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(result));
		});
});

app.listen( process.env.PORT );
