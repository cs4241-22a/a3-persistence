const router = require('express').Router();

const AutoCheck = (req,res,next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/', AutoCheck, (req,res) => {
    res.redirect('/Logged_in.html');
})

module.exports = router;