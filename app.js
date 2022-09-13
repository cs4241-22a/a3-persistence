require('dotenv').config();
const express = require('express'), app = express();
const session = require('express-session');
const mongoose = require("mongoose");
const passport = require('passport');

const {Game, User} = require("./models");
const authRouter = require("./routes/auth");

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
app.use("/", express.static("public"));
app.use("/", authRouter);

app.get("/games", async (req, res) => {
    const games = await Game.find({});
    res.send(games);
})

app.post("/games", express.json(), async (req, res) => {
    const requestData = {
        avg: req.body.hits/req.body.atBats,
        ...req.body
    }
    const requestGame = new Game(requestData);
    requestGame.save().then(saved => {console.log(saved)}).catch(err => console.log(err))
    res.json(requestData);
})

app.put("/games", express.json(), async (req, res) => {
    const requestData = {
        ...req.body,
        avg: req.body.hits/req.body.atBats
    }
    const query = await Game.findOneAndReplace({_id: requestData._id}, requestData)
    if(!query){
        res.status(404).send("error");
    }else{
        res.status(200).send(JSON.stringify(requestData))
    }
})

app.delete("/games", express.json(), async (req, res)=> {
    const query = await Game.findOneAndDelete({_id: req.body._id});
    if(!query){
        res.status(404).send("error");
    }else{
        res.status(200).send("DELETED");
    }
})


app.listen(3000);


