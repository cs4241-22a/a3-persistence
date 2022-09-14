const ScoreEntry = require("../../models/ScoreEntry");

const deleteScore = async (req, res, next) => {
  const { objectId } = req.body;
  await ScoreEntry.findByIdAndDelete(objectId);
  res.send({ msg: `Succesfully deleted entry with objectId: ${objectId}` });
};

module.exports = deleteScore;
