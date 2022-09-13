require('dotenv').config();
const express = require('express'), app = express();
const session = require('express-session');
const mongoose = require("mongoose");
const passport = require('passport');

const {Game, User} = require("./models");
const {router: authRouter, requireAuth} = require("./routes/auth");
const gamesRouter = require("./routes/games");

mongoose.connect(`mongodb+srv://axbolduc:${process.env.MONGO_DB_PASS}@cluster0.3vkednf.mongodb.net/bb-stats?retryWrites=true&w=majority`).then(
    () => {console.log("Connected to MongoDB")},
)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/games", requireAuth, gamesRouter);
app.use("/", requireAuth, express.static("public"));

app.listen(3000);


