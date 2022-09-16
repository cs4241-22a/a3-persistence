const router = require("express").Router();
const passport = require("passport");

router.get("/", passport.authenticate("github", { scope: ["user:email"] }));
router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/login");
});

module.exports = router;
