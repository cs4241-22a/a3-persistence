require('dotenv').config();
const express = require('express'), app = express();
const mongoose = require("mongoose");
const game = require('./schemas/game');
const gameSchema = require("./schemas/game");
const userSchema = require("./schemas/user");

mongoose.connect(`mongodb+srv://axbolduc:${process.env.MONGO_DB_PASS}@cluster0.3vkednf.mongodb.net/bb-stats?retryWrites=true&w=majority`)
    .then(status => {
        console.log("Connected to mongodb");
    })

const Game = mongoose.model("Game", gameSchema);
const User = mongoose.model("User", userSchema);

const tempGame = new Game({
    date: Date.now(),
    hits: 1,
    atBats: 2,
    avg: 1/2
})

// tempGame.save().then(game => {
//     console.log(game);
// })

app.use("/", express.static("public"));

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
        date: req.body.date.toLocaleDateString,
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

})

app.listen(3000);


