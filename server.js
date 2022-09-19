const express = require( 'express' ),
    cookie  = require( 'cookie-session' ),
    app = express(),
    engine = require('express-handlebars')

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

// cookie middleware! The keys are used for encryption and should be
// changed
app.use( cookie({
  name: 'session',
  keys: ['2iMAwLWcViIKX5kAXuted14Jejr5Nwd4', '8ihbYfca2GFjh3eTvL1zpaWbgY0fZGWh']
}))

app.engine('handlebars', engine.engine());
app.set('view engine', 'handlebars');

app.post( '/login', (req,res)=> {
    // express.urlencoded will put your key value pairs 
    // into an object, where the key is the name of each
    // form field and the value is whatever the user entered
    console.log( req.body )
    
    // below is *just a simple authentication example* 
    // for A3, you should check username / password combos in your database
    if( req.body.password === 'test' ) {
      // define a variable that we can check in other middleware
      // the session object is added to our requests by the cookie-session middleware
      req.session.login = true
    }else{
      // password incorrect, redirect back to login page
      res.sendFile( __dirname + '/views/index.html' )
      //maybe add a wrong password message
    }
  })
  

app.get( '/main', ( req, res) => {
    if( req.session.login === true )
        
        res.render(__dirname +"/views/layouts/main.handlebars",
          {
            task: [
              "one task",
              "two task",
              "red task",
              "blue task"
            ]
          } 
        )
    else{
        res.sendFile( __dirname + '/views/index.html' )
    }
})

app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) ) 

app.listen( process.env.PORT || 3000 )