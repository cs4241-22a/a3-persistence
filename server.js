const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv')
const cookie = require('cookie-session')
const hbs = require('express-handlebars').engine;
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();
dotenv.config();

// use mongoose to connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error(error);
  }
}

connectDB();

// create user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  win: {
    type: Number,
    default: 0
  },
  loss: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', UserSchema);


// Middleware
app.engine('hbs', hbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
app.use(session({
  secret: "verygoodsecret",
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// verify the login
passport.use(new localStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });

    bcrypt.compare(password, user.password, function (err, res) {
      if (err) return done(err);
      if (res === false) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    });
  });
}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
}

// ROUTES
app.get('/', isLoggedIn, (req, res) => {
  res.render("index", {layout: false});
});

app.get('/login', isLoggedOut, (req, res) => {
  const response = {
    title: "Login",
    error: req.query.error
  }

  res.render('login', response);
});

app.get('/register', isLoggedOut, (req, res) => {
  const response = {
    title: "Register",
    error: req.query.error
  }

  res.render('register', response);
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?error=true'
}));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// handle register
app.post('/register', async (req, res) => {
  // check for duplicate
  const exists = await User.exists({ username: req.body.username });
	if (exists) {
		res.redirect('/register?error=true');
		return;
	};

  // encrypt the password
  const hashedPwd = await bcrypt.hash(req.body.password, 10);

  // create and store the new user
  const result = await User.create({
    username: req.body.username,
    password: hashedPwd
  });

  result.save();

  // after registration redirect back to login
  res.redirect('/login')

});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
})

