const express = require('express'),
    app = express()

const bodyparser = require('body-parser')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const db = low( new FileSync( 'data.json'))

db.defaults({ songs:[] }).write()
app.use(express.static('./'))

console.log('in server')

// app.use(bodyParser.json())

// app.use(function(req, res, next)
// {
//     console.log(req.url)
//     next()
// })

// app.use(bodyParser.urlencoded({
//     extended: false
// }))

// app.use(express.urlencoded({
//     extended: true
// }))


app.get('/', function(req, res){res.sendFile("index.html")})

app.post( '/submit', bodyparser.json(), function( req, res )  {
    console.log('recieving data...')
    // const testSongName = req.body.testSongName
    // const songname = req.body.songname
    // const artistname = req.body.artist
    // const songduration = req.body.songduration
    // const albumname = req.body.album
    // console.log(testSongName)
    // res.send(testSongName)

    //res._write(testSongName)
    db.get( 'songs' ).push(req.body.newsong).write()
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(db.getState()))
})

//app.listen(3000)
const listener = app.listen( process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port )
})