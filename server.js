const express = require("express"),
    app = express()

app.use(express.static('public'))
app.use(express.static('views'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(3000)