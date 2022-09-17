const mongoose = require("mongoose");

const gameSchema = require("./schemas/game");
const userSchema = require("./schemas/user");

const Game = mongoose.model("Game", gameSchema);
const User = mongoose.model("User", userSchema);

module.exports = {Game, User};