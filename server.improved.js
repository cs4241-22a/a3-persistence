const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      port = 3000
var taskIdPointer = 0;
const appdata = [];
// app data is {"task":"Task Name",   "dueDate": "When the task is due", "taskType":"Work or personal"}
// self generated: {"taskID" : "Unique ID for a task", "taskCreationTime": "Based on when the request was made", "taskUrgency": "How urgent the Task is, based on (dueDate - taskCreationDate)"}
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    console.log('POST REQUEST FOR: ' + request.url.slice(1))
    if (request.url.slice(1) == "submit") {
      // task submission
      handlePost( request, response ) 
    } else if (request.url.slice(1) == "delete"){
      //delete
      handleDelete( request, response )
    } else if (request.url.slice(1) == "edit"){
      //edit
      handleEdit( request, response )
    }
  } 
})

const handleGet = function( request, response ) {
  const filename = request.url.slice( 1 ) 
  console.log("GET REQUEST FOR: " + filename);
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if ( request.url === '/tasks' ){
    sendTasks(response)
  }
  else{
    sendFile( response, filename )
  }
}

const handleDelete = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })
  request.on( 'end', function() {
    var found = false;
    const incomingData = JSON.parse(dataString);
    for (let aTask in appdata){
      let taskJson = appdata[aTask];
      if (taskJson.taskID == incomingData.taskID) {
        found = true;
        appdata.splice(aTask,1);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break;
      }
    }
    if (!found){
      response.writeHead( 410, "Gone", {'Content-Type': 'text/plain' })
      response.end()
    }})
}

const handleEdit = function( request, response ) {
  let dataString = ''
  request.on( 'data', function( data ) {
      dataString += data 
  })
  request.on( 'end', function() {
    var found = false;
    const incomingData = JSON.parse(dataString);
    var currentDateTime = incomingData.taskCreationTime;
    if(incomingData.dueDate == null){
      incomingData.taskUrgency = null;
    } else {
      if (currentDateTime > incomingData.dueDate) currentDateTime = incomingData.dueDate;
      incomingData.taskUrgency = getTaskUrgency(incomingData.dueDate - currentDateTime);
    }
    
    for (let aTask in appdata){
      let taskJson = appdata[aTask];
      if (taskJson.taskID == incomingData.taskID) {
        found = true;
        appdata.splice(aTask,1);
        appdata.push(incomingData);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break;
      }
    }
    if (!found){
      response.writeHead( 410, "Gone", {'Content-Type': 'text/plain' })
      response.end()
    }})
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    taskIdPointer++;
    var currentDateTime = Date.now();
    const incomingData = JSON.parse(dataString);
    if(incomingData.dueDate == null){
      incomingData.taskUrgency = null;
    } else {
      if (currentDateTime > incomingData.dueDate) currentDateTime = incomingData.dueDate;
      console.log("Time received: " +  incomingData.dueDate);
      incomingData.taskUrgency = getTaskUrgency(incomingData.dueDate - currentDateTime);
    }
    incomingData.taskCreationTime = currentDateTime;
    incomingData.taskID = taskIdPointer;
    // need some sort of check before adding it
    appdata.push(incomingData);
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

// deltaTime in ms
// Urgency is either 0(past due), 1 (URGENT), 2(medium urgency), 3 (not really)
const getTaskUrgency = function(deltaTime){
  const numDaysLeft = deltaTime/86400000;
  console.log("Days left " + numDaysLeft);
  if (numDaysLeft <= 0){
    return 0;
  }  else if (numDaysLeft <= 2){
    return 1;
  } else if (numDaysLeft <= 7){
    return 2;
  } else {
    return 3;
  }
}
const sendTasks = function(response) {
  response.writeHeader( 200, { 'Content-Type': 'application/json' })
  response.end( JSON.stringify(appdata) )
}

const sendFile = function(response, filename) {
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

server.listen( process.env.PORT || port )
