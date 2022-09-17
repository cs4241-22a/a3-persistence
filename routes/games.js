const express = require("express");
const { Game, User } = require("../models");

const router = express.Router();

/** 
 * Get Games Endpoint
 */
router.get("/", async (req, res) => {
    const games = await Game.find({owner: req.user._id});
    res.send(games);
})

/**
 * New Game Endpoint
 */
router.post("/", express.json(), async (req, res) => {
    const requestData = {
        avg: req.body.hits/req.body.atBats,
        owner: req.user._id,
        ...req.body
    }
    const requestGame = new Game(requestData);
    requestGame.save().then(saved => {res.json(saved)}).catch(err => res.status(400).json(err));
})

/**
 * Update Game Endpoint
 */
router.put("/", express.json(), async (req, res) => {
    const requestData = {
        ...req.body,
        owner: req.user._id,
        avg: req.body.hits/req.body.atBats
    }
    const query = await Game.findOneAndReplace({_id: requestData._id}, requestData)
    if(!query){
        res.status(404).send("error");
    }else{
        res.status(200).send(JSON.stringify(requestData))
    }
})

/**
 * Delete Game Endpoint
 */
router.delete("/", express.json(), async (req, res)=> {
    const query = await Game.findOneAndDelete({_id: req.body._id});
    if(!query){
        res.status(404).send("error");
    }else{
        res.status(200).send("DELETED");
    }
})


module.exports = router