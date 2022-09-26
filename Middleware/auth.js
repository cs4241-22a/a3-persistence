const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    // redirect to login page
    console.log("Not Logged In yet - redirecting");
    res.redirect("/auth");
    // res.status(401).send("Not Logged In");
  }
};
module.exports = isLoggedIn;
