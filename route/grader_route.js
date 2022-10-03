const router = require('express').Router();

const check = (req,res,next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/', check, (req,res) => {
    res.redirect('/login.html');
})

module.exports = router;