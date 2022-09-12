const express    = require('express'),
      app        = express(),
      workouts   = []

app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) )
app.use( express.json() )

app.post( '/submit', (req, res) => {
  workouts.push( req.body.newLift )
  res.writeHead( 200, { 'Content-Type': 'application/json' })
  res.end( JSON.stringify( workouts ) )
})

app.listen( process.env.PORT || 3000)