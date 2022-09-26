const express = require( 'express' ),
    mongodb = require( 'mongodb' ),
    path = require('path'),
    errorhandler = require('errorhandler'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    GitHubStrategy = require('passport-github2').Strategy,
    favicon = require('serve-favicon'),
    app = express()
require('dotenv').config()

const uri = 'mongodb+srv://'+process.env.USERNAME+':'+process.env.PASSWORD+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

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

app.use( (req,res,next) => {
    if( collection !== null ) {
        next()
    }else{
        res.status( 503 ).send()
    }
})

app.set('env', 'development')
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler())
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use( express.static('public') )
app.use( express.static('views'))
app.use( express.json() )
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://204.48.19.41/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            return collection.updateOne({githubID:profile.id},
                {$setOnInsert:{githubID:profile.id, climbs:[]}},
                {upsert:true})
                .then(() => {
                    return collection.findOne({githubID:profile.id})
                }).then((result) => {
                    return done(null, result._id)
                })
        });
    }
));

app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
    res.render('login', { user: req.user });
});

app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/session.passportin' }),
    function(req, res) {
        res.redirect('/account.html');
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

app.get('/show', (req, res) => {
    collection.find({_id:mongodb.ObjectId(req.session.passport.user)})
        .project({_id:0, climbs:1})
        .toArray()
        .then(result => res.json(result));
})

app.post('/addClimb', (req, res) => {

    const body = {
        climbName: req.body.climbName,
        grade: req.body.grade,
        height: req.body.height
    }

    collection.updateOne(
        {_id: req.session.passport.user},
        {$push:{ climbs: body }})
        .then(result => res.json(result))
})

app.post('/removeClimb', (req, res) => {
    const body = {
        climbName: req.body.climbName
    }

    collection.update(
        { user: req.session.passport.user },
        { $pull: { climbs: { climbName: body } } }
    );
})

app.post( '/remove', (req,res) => {

    collection
        .deleteOne({user: req.session.passport.user})
        .then( result => res.json( result ) )
})

app.listen( 3069 )