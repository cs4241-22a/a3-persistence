const ScoreEntry = require("../../models/ScoreEntry");

const getScores = async (req, res, next) => {
  const { username: githubUsername } = req.user;
  const allScores = await ScoreEntry.find({ githubUsername });
  res.send(allScores);
};

module.exports = getScores;
