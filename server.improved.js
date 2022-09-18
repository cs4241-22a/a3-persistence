const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      dir  = 'public/',
      port = 3000;
      
      
const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');


const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mileage': 205724},
  { 'model': 'dodge', 'year': 2004, 'mileage': 172057 },
  { 'model': 'ford', 'year': 1987, 'mileage': 299690} 
]

app.use(serveStatic(dir, {index: ['index.html', 'index.htm']}))

app.use(bodyParser.json({type: 'text/plain'}));

app.post('/submit', (request,response) => handlePostJ(request, response));


const handlePostJ = function( request, response){
  var inD = request.body;
  console.log("Express json procedure")
  console.log(inD)
  if(inD.action === "add"){
    nC = {model: inD.model, year: inD.year, mileage: inD.mileage}
    appdata.push(nC)
  }
  if(inD.action === "delete"){
    const trashBin = appdata.splice(inD.indec, 1)
  }
  theYear = new Date().getFullYear()
  for(k=0; k<appdata.length;k++){
    appdata[k].milesPerYear = parseInt(appdata[k].mileage / (theYear - appdata[k].year))
  }
  console.log(appdata)
  var rb = JSON.stringify(appdata)
  response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
  response.end(rb)
}



const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    // ... do something with the data here!!!
    var inD =  JSON.parse( dataString ) 
    console.log(inD)
    if(inD.action === "add"){
      nC = {model: inD.model, year: inD.year, mileage: inD.mileage}
      appdata.push(nC)
    }
    console.log(appdata)
    if(inD.action === "delete"){
      const trashBin = appdata.splice(inD.index, 1)
    }
    theYear = new Date().getFullYear()
    for(k = 0; k<appdata.length; k++){
      appdata[k].milesPerYear = parseInt(appdata[k].mileage / (theYear - appdata[k].year))
    }
    console.log(appdata)
    var rb = JSON.stringify(appdata)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(rb)
  })
}

app.listen(process.env.PORT || port)


