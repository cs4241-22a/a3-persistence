require('dotenv').config();
const express = require('express'),
      mongodb = require('mongodb'),
      uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}`,
      client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true}),
      passport = require('passport'),
      GitHubStrategy = require('passport-github2').Strategy,
      app = express();
let collection = undefined;
client.connect().then( () => { collection = client.db( 'data' ).collection( 'movies' ) } );
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://a3-hyoder.herokuapp.com/auth/github/callback' },
  function(accessToken, refreshToken, profile, done)
  {
    User.findOrCreate({ githubId: profile.id },
    function(err, user) { return done(err, user); });
  }
));
app.get('/', ( req, res ) => { res.redirect('/index.html') });
app.get('/login', ( req, res ) =>
{
  res.sendFile('index.html', { user: req.user, root: Path2D.join(__dirname, 'public')});
});
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) { res.redirect('/main.html'); });
app.get('/data', checkAuth, ( req, res ) =>
{
  collection.find({ id:mongodb.ObjectId() })
  .project({ id: 0, items: 1 }).toArray()
  .then( result => res.json( result ) );
});
app.post('/submit', checkAuth, ( req, res ) =>
{
  let body = { id: mongodb.ObjectId(), title: req.body.title, genre: req.body.genre, year: req.body.year };
  collection.updateOne({ id: mongodb.ObjectId() }, 
                       { $push: { items: body } })
  .then( result => res.json( result ) );
});
app.post('/delete', checkAuth, ( req, res ) =>
{
  collection.updateOne({ id: mongodb.ObjectId() },
                       { $pull: { items: { id: mongodb.ObjectId( req.body.id ) } } })
  .then( result => res.json( result ) );
});
app.post('/update', checkAuth, ( req, res ) =>
{
  let changer = { id: mongodb.ObjectId( req.body.id ), title: req.body.title, genre: req.body.genre, year: req.body.year };
  collection.updateOne({ id: mongodb.ObjectId(), "items.id":mongodb.ObjectId( req.body.id ) },
                       { $set:  "items.$", changer })
  .then( result => res.json( result ) );
});
function checkAuth( req, res, next ) {
  if ( allowed.includes(req.path) || req.isAuthenticated()) { return next(); }
  res.redirect( '/login' ); };
app.listen( process.env.PORT || 3000 )