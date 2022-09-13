const express = require("express");
const { Game, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
    const games = await Game.find({});
    res.send(games);
})

router.post("/", express.json(), async (req, res) => {
    const requestData = {
        avg: req.body.hits/req.body.atBats,
        ...req.body
    }
    const requestGame = new Game(requestData);
    requestGame.save().then(saved => {res.json(saved)}).catch(err => res.status(400).json(err));
})

router.put("/", express.json(), async (req, res) => {
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

router.delete("/", express.json(), async (req, res)=> {
    const query = await Game.findOneAndDelete({_id: req.body._id});
    if(!query){
        res.status(404).send("error");
    }else{
        res.status(200).send("DELETED");
    }
})


module.exports = router