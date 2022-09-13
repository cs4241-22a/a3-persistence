const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {
    'assignment': 'Webware Assignment 2',
    'subject': 'CS',
    'dead_line': '2022-09-08',
    'priority': 'Medium   '
  },
  {
    'assignment': 'ENV 1110 Presentation',
    'subject': 'ENV',
    'dead_line': '2022-09-08',
    'priority': 'Low'
  },
  {
    'assignment': 'MQP',
    'subject': 'CS',
    'dead_line': '2022-12-12',
    'priority': 'High'
  }
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  } else if (request.method === 'DELETE') {
    handleDelete(request, response)
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/list') {
    sendListData(response)
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on('end', () => {

    let newTask = JSON.parse(dataString)
    newTask.priority = isCS(newTask.subject,newTask.assignment)
    appdata[appdata.length] = newTask
    sendListData(response)
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

const handleDelete = function (request, response) {
  const num = request.url.substring(1)
  appdata.splice(parseInt(num), 1)
  sendListData(response)
}

const sendListData = function (response) {
  response.writeHeader(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(appdata))
}

const isCS = function (subject, assignment) {

  if (subject === "CS" || subject === "cs" || subject === "Computer Science ")
    if (assignment === "MQP")
      return 'High'
    else
      return 'Medium'
  else
    return 'Low'

}

server.listen( process.env.PORT || port )
