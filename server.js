const express = require( 'express' ),
    mongodb = require( 'mongodb' ),
    cookie = require('cookie-session'),
    path = require('path'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    partials = require('express-partials'),
    methodOverride = require('method-override'),
    app = express()
require('dotenv').config()

const GitHubStrategy = require('passport-github2').Strategy;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.use( express.static('public') )
app.use( express.static('views'))
app.use( express.json() )
app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

const uri = 'mongodb+srv://'+process.env.USERNAME+':'+process.env.PASSWORD+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's GitHub profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the GitHub account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));


app.use( cookie({
    name: 'session',
    keys: ['key1', 'key2']
}))

client.connect()
    .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'ClimbTracker' ).collection( 'users' )
    })
    .then( __collection => {
        // store reference to collection
        collection = __collection
        // blank query returns all documents
        return collection.find({ }).toArray()
    })
    .then( console.log )

// route to get all docs
app.get( '/', (req,res) => {
    if( collection !== null ) {
        // get array and pass to res.json
        collection.find({ }).toArray().then( result => res.json( result ) )
    }
})

app.listen( 3069 )

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

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/remove', (req,res) => {
    collection
        .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
        .then( result => res.json( result ) )
})

app.post( '/update', (req,res) => {
    collection
        .updateOne(
            { _id:mongodb.ObjectId( req.body._id ) },
            { $set:{ name:req.body.name } }
        )
        .then( result => res.json( result ) )
})

app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
    res.render('login', { user: req.user });
});

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

app.post('/addClimb', (req, res) => {
    collection
        .find({username: req.session.user })
        .toArray()
        .then(result => {
            const climbs = result[0].climbs;
            console.log(climbs)
            climbs.push({
                climbName: req.body.climbName,
                grade: req.body.grade,
                height: req.body.height
            });

            //From given update to update the array of climbs
            collection.updateOne(
                {_id:mondgodb.ObjectId(result[0]._id)},
                { $set:{ climbs: climbs } }
            )
            res.json(climbs)
        })
})