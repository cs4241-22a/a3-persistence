const router = require("express").Router();
const passport = require("passport");

router.get(
  "/github", //get to the direcory of gitub
  passport.authenticate("github", {
    scope: ["profile"],
  }) //fetch the from the github . the github API understands what the "profile" is
);

router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
    console.log(req.user)
    res.redirect("/application");
});

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
    console.log('logged out')
})
module.exports = router;
