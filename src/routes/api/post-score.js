const ScoreEntry = require("../../models/ScoreEntry");

const postScore = async (req, res, next) => {
  const { playerName, playerScore, winResult } = req.body;
  const { username: githubUsername } = req.user;
  const newEntry = new ScoreEntry({
    playerName,
    playerScore,
    winResult,
    githubUsername,
  });
  await newEntry.save();
  res.send({ playerName, playerScore, winResult });
};

module.exports = postScore;
