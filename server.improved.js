require('dotenv').config()

const express = require('express'),
      mongodb = require('mongodb'),
      app = express(),
      port = 3000

let reminders = []

app.use(express.static('views'))
app.use(express.json())
app.use(express.static(__dirname + '/public'));

const connect = async () => {
  const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
  const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology:true})

  try {
    await client.connect()
    await listDatabases(client)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }

  console.log('connected to mongodb server')
  const collection = client.db("datatest").collection("test")
  //console.log(collection)
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

connect()

/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://milesdatabse:EutAV1ENZbpmYLfk@a3-assignment.bolnyzj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("datatest").collection("test");
  console.log("connected to db!!!!")
  console.log(err)
  // perform actions on the collection object
  client.close();
});*/

/*const handleGet = (request, response) => {
  console.log('in get')
  console.log(request.url)
  switch (request.url) {
    case '/api/getdata':
      console.log('sending data back to client')
      console.log(reminders)
      response.writeHeader(200, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(reminders))
      break
    default:
      break
  }
}*/

//app.use(handleGet)

app.get('/api/getdata', (request, response) => {
  response.writeHeader(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(reminders))
})

app.post('/api/newreminder', (request, response) => {
  console.log(request)
  reminders.push(request.body)
  response.writeHead(200, "OK", {'Content-Type': 'application/json'})
  response.end()
})

app.post('/api/deletereminder', (request, response) => {
  console.log(request)
  reminders = reminders.filter((element) => {
    return JSON.stringify(element) != JSON.stringify(request.body) //element.title !== data.title
  })
  response.writeHead(200, "OK", {'Content-Type': 'application/json'})
  response.end()
})

/*const handlePost = (request, response, next) => {
  let dataString = ''

  request.on('data', (data) => {
      console.log("Data:", data)
      dataString += data 
  })

  console.log('here')

  request.on('end', () => {
    console.log(dataString)
    const data = JSON.parse(dataString)

    switch (request.url) {
      case '/api/newreminder':
        console.log('new data incoming')
        reminders.push(data)
        console.log(reminders)
        response.writeHead(200, "OK", {'Content-Type': 'application/json'})
        response.end()
        break
      case '/api/deletereminder':
        console.log('new delete data incoming')
        reminders = reminders.filter((element) => {
          return JSON.stringify(element) != JSON.stringify(data) //element.title !== data.title
        })
        console.log(reminders)
        response.writeHead(200, "OK", {'Content-Type': 'application/json'})
        response.end()
        break
      default:
        console.log("ERROR")
        break
    }

    next()
  })
}

app.use(handlePost)*/

app.listen(process.env.PORT || port)