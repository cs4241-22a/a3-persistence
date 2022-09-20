const express = require("express")
const app = express()

let appdata = []
//derived fields
let totalDistance = 0
let totalElevation = 0

app.use(express.static("public"))
app.use(express.json())

app.post( '/submit', express.json(), (req, res) => {
    const data = req.body

    if(data.name === '!clear') {
        //clear data
        appdata = []
        totalElevation = 0
        totalDistance = 0
    } else if(data.name === '!update') {
        //simply do nothing; server just sends back the data it has
    } else {
        //add new data to appdata if not a clear or update call

        //add derived fields
        totalDistance = parseFloat(totalDistance) + parseFloat(data.length)
        totalElevation = parseFloat(totalElevation) + parseFloat(data.elevation)
        data.totallength = totalDistance
        data.totalelevation = totalElevation

        appdata.push( data )
    }
    res.writeHead( 200, { 'Content-Type': 'application/json' })
    res.end( JSON.stringify( appdata ) )
})

app.listen(process.env.PORT || 3000)
