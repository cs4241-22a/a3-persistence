const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
]
  // { 'studentName': 'Roopsa', 'a1score': 90, 'a2score': 90, 'Project Score': 91, 'Exam Score': 'A'},
  // { 'studentName': 'Hota', 'a1score': 82, 'a2score': 82, 'Project Score': 81, 'Exam Score': 'B'},
  // { 'studentName': 'Sahana', 'a1score': 75, 'a2score': 75, 'Project Score':751, 'Exam Score': 'C'} 
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/login.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
      console.log("-----------")
      console.log(dataString)
  })

  request.on( 'end', function() {
    if(request.url === "/submit"){
      //console.log( JSON.parse( dataString ) )

      let newStudent = JSON.parse(dataString)
      newStudent.finalScore = finalGrade(newStudent.a1score, newStudent.a2score, newStudent.projectSc, newStudent.examScore)

      appdata.push(newStudent)

    } else if (request.url === '/delete'){
      let i = JSON.parse( dataString ).index
      appdata.splice( i, 1 )
      //console.log(appdata)
    }

  
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
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


function finalGrade(a1,a2,project,exam){
  console.log(a1,a2,project,exam)
  let score =0;
  console.log(((parseInt(a1) + parseInt(a2))/2)* 0.55,((project) * 0.35),((exam)*0.1))
  score = ((parseInt(a1) + parseInt(a2))/2)* 0.55 + (parseInt(project)) * 0.35 + (parseInt(exam))*0.1;
  //score = (+a1 + +a2)*0.55 + +project*0.35 + +exam*0.1
  let grade =""
  
  if(score > 90.0 ){
    grade = "A"
    console.log(score);
  }
  else if(score > 80.0){
    grade = "B"
  }
  else if(score > 70.0 ){
    grade = "C"
  }
  else{
    grade = "NR"
  }
  return grade;
}

server.listen( process.env.PORT || port )
