const express = require('express'),
      app = express()

//creat[ing onew middleware]
app.use( (req,res,next) => {
  console.log( req.url )
  next()
})

app.use(express.static("public"))

// app.get( '/', ( req, res ) => res.send( 'test') )

app.listen( 3000 )