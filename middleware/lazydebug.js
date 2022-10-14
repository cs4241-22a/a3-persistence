const lazyDebug = (req, res, next) => {
    console.log("The code has made it to this point")
    next()
}

module.exports = lazyDebug