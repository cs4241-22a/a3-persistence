require('dotenv').config()
const express = require( 'express' ),
      cookie  = require( 'cookie-session' ),
      hbs = require( 'express-handlebars').engine,
      app = express()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'datatest1' ).collection( 'test' )
  })
  .then( collection => {
    // blank query returns all documents
    return collection.find({ }).sort({ "$natural": 1 }).toArray()
  })
  .then( console.log )

  app.use( (req,res,next) => {
    if( client.db.collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
  })

let collection = client.db('datatest1').collection('test')


app.use( express.static( './public' ) )
app.use( express.urlencoded({ extended: true}))
app.use( express.json() )
app.engine('handlebars', hbs() )
app.set('view engine', 'handlebars' )
app.set( 'views', './views')

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))


app.post( '/login', (req,res) => {
  collection.findOne({'_username': req.body.username, '_password': req.body.password}).then(data => {
    if (data === null) {
      collection.findOne({'_username': req.body.username}).then(data => {
        if (data === null) {
          req.session.login = true
          collection.insertOne( {_username: req.body.username, _password: req.body.password} )
          res.redirect(`index.html?param=${req.body.username}`)
        }
        else {
          req.session.login = false
          res.render('login', {msg:'Wrong password, please try again', layout:false})
        }
      })
    }
    else {
      req.session.login = true
      res.redirect(`index.html?param=${req.body.username}`)
    }
  })  
})

app.get( '/', (req,res) => {
  res.render( 'login', {msg:'', layout:false})
})

app.use( function(req,res,next) {
  if(req.session.login === true ) {
  next()
  }
  else {
    res.render('login', {msg:'login failed, please try again', layout:false})
  }
})

app.get('/index.html', (req, res) => {
  res.render('index', { msg:`Hi, ${req.query.param}`, username:req.query.param.toString(), layout:false})
})  

app.post( '/getShoppingData', ( req, res ) => {
  async function wait() {
  const tempData = await collection.find({'username': req.body.username}).sort({ "$natural": -1 }).toArray()
  res.writeHead( 200, "OK", {'Content-Type': 'application/json' })
  res.end( JSON.stringify(tempData))
  }
  wait()
  })


app.post( '/submit', (req,res) => {
  // assumes only one object to insert
  collection.insertOne( req.body ).then( result => res.json( result ) )
})

app.post('/deleteData', (req, res) => {
  let i = 1
  collection.find({'username': req.body.username}).sort({ "$natural": 1 }).limit(parseInt(req.body.row)).forEach(doc =>
    {
      if (i === parseInt(req.body.row)) {
        collection.deleteOne({_id:doc._id})
      }
      i++
    })
    res.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    res.end( JSON.stringify(""))
})

app.post('/modifyData', (req, res) => {
  let i = 1
  collection.find({'username': req.body.username}).sort({ "$natural": 1 }).limit(parseInt(req.body.row)).forEach(doc =>
    {
      if (i === parseInt(req.body.row)) {
        collection.updateOne({_id:doc._id}, {$set:{shoppingitem:req.body.shoppingitem, quantity:req.body.quantity, price:req.body.price}})
      }
      i++
    })
    res.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    res.end( JSON.stringify(""))
})

app.listen( process.env.PORT || 8000 )