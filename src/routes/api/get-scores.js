const ScoreEntry = require("../../models/ScoreEntry");

const getScores = async (req, res, next) => {
  const allScores = await ScoreEntry.find();
  res.send(allScores);
};

module.exports = getScores;
