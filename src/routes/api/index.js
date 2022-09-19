const router = require("express").Router();

router
  .route("/scores")
  .get(require("../../middleware/is-logged-in"), require("./get-scores"));
router
  .route("/score")
  .post(require("../../middleware/is-logged-in"), require("./post-score"))
  .put(require("./put-score"))
  .delete(require("./delete-score"));

module.exports = router;
