const express = require( 'express' ),
      errorhandler = require('errorhandler'),
      helmet = require( 'helmet' ),
      cookie  = require( 'cookie-session' ),
      hbs     = require( 'express-handlebars' ).engine,
      bodyParser = require( 'body-parser' ),
      mongodb = require( 'mongodb' ),
      timeout = require( 'connect-timeout' ),
      app     = express()

const userlogin = {
  username: 'user',
  password: 'test'
}

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )
app.use( express.static('public') )
app.use( express.json() )
app.use( timeout('30s') ) // this is part of express too?

// we're going to use handlebars, but really all the template
// engines are equally painful. choose your own poison at:
// http://expressjs.com/en/guide/using-template-engines.html
app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )


// cookie middleware! The keys are used for encryption and should be changed
app.use( cookie({
  name: 'session',
  keys: ['firstkey', 'secondkey']
}))

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

let dreams = [
  {
    className: "calc",
    classNumber: "4444"
  },
  {
    className: "beansClass",
    classNumber: "3334"
  },
]

/*
app.post( '/login', (req,res)=> {
  if( req.body.password === 'test' ) {
    req.session.login = true
    res.redirect( 'main.html' )
  }else{
    req.session.login = false
    res.render('index', { msg:'login failed, please try again', layout:false })
  }
})
*/

//logout code

app.post("/logout", bodyParser.json(), (request, response) => {
  if (request.session.login == true) {
    request.session.usr = "";
    request.session.login = false;

    response.json({ logout: true });
  }else{
    response.json({ logout: false })
  }
});

//logout code ending
app.get("/getInitialDreams", bodyParser.json(), (request, response) => {
  console.log("getInitialDreams called!")
  collection
    .find({ usr: request.session.usr})
    .toArray()
    .then(result => {
      let entries = result[0].entries;
      console.log(result[0]);
      console.log(entries);
      console.log("entries^");
      response.json(entries);
    });
});
// get initial dreams



// get initial dreams ending


// register code
app.post("/register", bodyParser.json(), (req, res) => {
  console.log("registering works!");

  collection
    .find({ usr: req.body.username })
    .toArray()
    .then(result => {
      if (result.length >= 1) {
        console.log(result)
      //  response.json({ login: false });
      } else {
        //user does not exist, create
        let newUser = {
          usr: req.body.username,
          pwd: req.body.password,
          entries: []
        };

        console.log(newUser);
        collection.insertOne(newUser);
        collection.insertOne(newUser);
        console.log("registering");
        console.log(req.body.usr);
        req.session.usr = req.body.usr;
        console.log("name:");
        console.log(req.session.usr);
        console.log(req.session.usr);
        req.session.login = true;
        //req.json({ login: true });
    
        res.redirect( 'index.html' )
      }
    });
});

app.post("/login", bodyParser.json(), (req, res) => {
  console.log("login works!");
  collection
    .find({ usr: req.body.username, pwd: req.body.password })
    .toArray()
    .then(result => {
      if (result.length >= 1) {
        req.session.usr = req.body.username;
        req.session.login = true;
        console.log("valid login");
        console.log(req.session.usr);
        //res.json({ login: true });
        res.redirect( 'main.html' )
      } else {
        console.log("invalid login")
        res.render('index', { msg:'login failed, please try again', layout:false })
        //res.json({ login: false });
      }
    });
});
// end of register code

// getname?

app.get("/getname", bodyParser.json(), (request, response) => {
  console.log("getname called! ");
  console.log(request.session.login);
  console.log(request.session.usr);
  response.json({ usr: request.session.usr });
});

// getname ending

app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('index', { msg:'login failed, please try again', layout:false })
})

app.get( '/main.html', ( req, res) => {
    res.render( 'main', { msg:'success you have logged in', layout:false })
})

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  //console.log("(getinitial)dreams called!")
  collection
    .find({ usr: request.session.usr })
    .toArray()
    .then(result => {
      //console.log("usr: " + request.session.usr);
      let entries = result[0].entries;
      //console.log(result[0]);
      //console.log(entries);
      //console.log("entries^");
      response.json(entries);
      //response.json(dreams); // with just this and not responding w entries it works
    });
  // express helps us take JS objects and send them as JSON
  //response.json(dreams);
});

const uri = 'mongodb+srv://a3db:a3DB@cluster0.qxmb84d.mongodb.net/?retryWrites=true&w=majority'

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'classData' ).collection( 'classDataCollectionOne' )
    //console.log("connected to mongodb")
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  //.then( console.log )


// ADDING TO DATABASE CAREFULLLL
/*
const newUser1 = {
  username: "testingUsername",
  password: "testingPassword",
  entries: []
}

collection.insertOne(newUser1) // cannot read properties of null?
*/
// DONE W THAT SUS SHIT


  
// route to get all docs
app.get( '/', (req,res) => {
  console.log('things are printing in the server')
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

// ATTENTION: Express code attempt here



// ATTENTION: express code attempt ending

app.listen( 3000 )

app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.post( '/add', (req,res) => {
  // assumes only one object to insert
  collection.insertOne( req.body ).then( result => res.json( result ) )
}) 

// adding but "/trynaAddSmth"
app.post("/trynaAddSmth", bodyParser.json(), (request, response) => {
  collection
    .find({ usr: request.session.usr })
    .toArray()
    .then(result => {
      let entries = result[0].entries;
    
      const newEntry = {
        className: request.body.className,
        classNumber: request.body.classNumber
      }
      entries.push(newEntry);

      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { entries: entries } }
      );
      response.json(entries);
    });
});

// editing but "/trynaEditSmth"; doesn't work
app.post("/trynaEditSmth", bodyParser.json(), (request, response) => {
  //console.log("in tryna edit smth");
  collection
    .find({ usr: request.session.usr })
    .toArray()
    .then(result => {
      let entries = result[0].entries;
    
      let testClassname = 'ii'
      /*
      console.log("entries: ");
      console.log(entries);
      console.log("request.body.classNumber:");
      console.log(request.body.classNumber);
      console.log("entries[request.body.testClassname]:");
      console.log(entries[request.body.testClassname]);
      */
    
      let updatedEntry = {
        className: request.body.className,
        classNumber: request.body.classNumber
      };
      //console.log("updatedEntry:");
      //console.log(updatedEntry);
      
      if (entries[request.body.classNumber]) {
        entries[request.body.classNumber] = updatedEntry;
      }

      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { entries: entries } }
      );

      response.json(entries);
    });
});

// trynaDeleteSmth

app.post("/trynaDeleteSmth", bodyParser.json(), (request, response) => {
  console.log("in tryna delete smth");
  collection
    .find({ usr: request.session.usr })
    .toArray()
    .then(result => {
      let entries = result[0].entries;
      
      /*
      console.log("entries: ");
      console.log(entries);
      console.log("request.body.className:");
      console.log(request.body.className);
      console.log("entries[request.body.className]:");
      console.log(entries[request.body.index]);
      */

      //if (entries[request.body.className]) {
      entries.splice(request.body.className, 1); // only deletes first entry
      //}

      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { entries: entries } }
      );
      response.json(entries);
    });
});

