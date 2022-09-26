require('dotenv').config();
const express = require( 'express' ),
      app = express(),
      cookie = require( 'cookie-session' ),
      hbs = require( 'express-handlebars' ).engine,
      bodyp = require( 'body-parser' ),
      session = require( 'express-session' ),
      path = require( 'path' ),
      mongodb = require( 'mongodb' ),
      uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}`,
      client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true}),
      passport = require('passport'),
      GitHubStrategy = require('passport-github2').Strategy;
let collection = undefined;
app.use( bodyp.json() );
app.use( cookie({ secret: 'poop time', resave: false, saveUninitialized: false }) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( express.static( path.join( __dirname + '/public' ) ) );
app.use( express.static( 'views' ) );
passport.serializeUser(   function( user, done ) { done( null, user ); } );
passport.deserializeUser( function(  obj, done ) { done( null,  obj ); } );
client.connect().then( () => { collection = client.db( 'a3' ).collection( 'a3' ) } );
app.use( ( req, res, next ) =>
{
  if( collection !== null ) { next(); }
  else { res.status( 503 ).send(); }
});
app.engine( 'handlebars', hbs() );
app.set( 'view engine', 'handlebars' );
app.set( 'views', './public/views' );
//app.use( cookie ({ name: 'session', keys: [ 'key1', 'key2' ] }) );
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://a3-hyoder.herokuapp.com/auth/github/callback' },
  function(accessToken, refreshToken, profile, done)
  {
    process.nextTick(function ()
    {
      return collection.updateOne( { githubID:profile.id }, { $setOnInsert: { githubID:profile.id, items:[] } }, { upsert: true } )
      .then( () => { return collection.findOne( { githubID: profile.id } ) } )
      .then( ( result ) => { return done( null, result._id ) } )
    });
    //User.findOrCreate({ githubId: profile.id },
    //function(err, user) { return done(err, user); });
  }
));
app.get('/', ( req, res ) => { res.render( "index", { msg: "", layout: false } ) } );
app.get('/login', ( req, res ) => { res.render( "main", { msg: "", layout: false } ); } );
  //res.sendFile('index.html', { user: req.user, root: Path2D.join(__dirname, 'public')});
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) { res.render( "main", { msg: "", layout: false } ); } );
app.get('/data', checkAuth, ( req, res ) =>
{
  collection.find({ _id:mongodb.ObjectId( req.session.passport.user ) })
  .project({ _id: 0, items: 1 }).toArray()
  .then( result => res.json( result ) );
});
app.post('/submit', checkAuth, ( req, res ) =>
{
  let body = { _movID: mongodb.ObjectId(), title: req.body.title, genre: req.body.genre, year: req.body.year };
  collection.updateOne({ _id: mongodb.ObjectId( req.session.passport.user ) }, { $push: { items: body } })
  .then( result => res.json( result ) );
});
app.post('/delete', checkAuth, ( req, res ) =>
{
  collection.updateOne({ _id: mongodb.ObjectId( req.session.passport.user ) },
                       { $pull: { items: { _movID: mongodb.ObjectId( req.body._movID ) } } })
  .then( result => res.json( result ) );
});
app.post('/update', checkAuth, ( req, res ) =>
{
  let changer = { _movID: mongodb.ObjectId( req.body._movID ), title: req.body.title, genre: req.body.genre, year: req.body.year };
  collection.updateOne({ _id: mongodb.ObjectId( req.session.passport.user ), "items._movID":mongodb.ObjectId( req.body._movID ) },
                       { $set:  "items.$", changer })
  .then( result => res.json( result ) );
});
function checkAuth( req, res, next )
{
  if ( req.isAuthenticated()) { return next(); }
  res.render( "index", { msg: "", layout: false } );
};
app.listen(process.env.PORT || 3000, function()
{
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});