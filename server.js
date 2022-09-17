const express = require('express'),
    app = express()

//app.get('/', function(req, res) {res.end('test')})

//app.get('/index.html', function(req, res) {res.end('test')})






// const logger = (req, res, next)=> {
//     console.log(req.url)
//     next()
// }

// app.use( logger )

// app.use(function(req, res, next)
// {
//     console.log(req.url)
//     next()
// })

// app.use(express.static('./'))

// app.get('/', function(req, res) {res.send('Hello world!')})


// app.listen(3000)



app.use(express.urlencoded({
    extended: true
}))

app.post('server.js', (req, res) => {
    const songname = req.body.songname
    const artistname = req.body.artist
    const songduration = req.body.songduration
    const albumname = req.body.album
    res.end()
})