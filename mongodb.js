export let collection = undefined;
export const mongodb = require('mongodb')
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority`

const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})

client.connect().then(() => {
    return client.db('data').collection('todos')
}).then(_collection => {
    collection = _collection
    return collection.find({ }).toArray()
}).then(console.log)