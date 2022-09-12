const router = require("express").Router();

router.route("/scores").get(require("./get-scores"));
router
  .route("/score")
  .post(require("./post-score"))
  .put(require("./put-score"))
  .delete(require("./delete-score"));

module.exports = router;
