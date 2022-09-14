const ScoreEntry = require("../../models/ScoreEntry");

const putScore = async (req, res, next) => {
  const { objectId, newData } = req.body;
  await ScoreEntry.updateOne({ _id: objectId }, { $set: newData });
  res.send({
    msg: `Succesfully updated document with objectId: ${objectId} to ${JSON.stringify(
      newData
    )}`,
  });
};

module.exports = putScore;
