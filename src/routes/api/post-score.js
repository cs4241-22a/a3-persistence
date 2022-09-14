const ScoreEntry = require("../../models/ScoreEntry");

const postScore = async (req, res, next) => {
  const { playerName, playerScore, winResult } = req.body;
  const newEntry = new ScoreEntry({ playerName, playerScore, winResult });
  await newEntry.save();
};

module.exports = postScore;
