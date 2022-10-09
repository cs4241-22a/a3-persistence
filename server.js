// const express = require( 'express' ),
//       app = express();

// app.use(express.static('a3-persistance'))
// app.use(express.static('public'))
     
// const logger = (req,res,next) => {
//   console.log( 'url:', req.url )
//   next()
// }

// app.use( logger )

// app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )

// app.listen( process.env.PORT || 3000 )

const express = require("express");
const passport = require("passport");
const path = require("path");
const AuthorizationRoute = require("./route/gitAuth_route");
var express_session = require("express-session");
const passportSetup = require("./config/passportSetup");
const client = require("./config/mongodbSetUp");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
var cookieParser = require("cookie-parser")
const ApplicationRouter = require("./route/grader_route");
const { stringify } = require("querystring");
var responseTime = require('response-time');
const { json } = require("express");
app = express();

app.set("view engine", "ejs");

app.use(
  cookieSession({
    keys: ["khdkasdhaksdhasdaks"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", AuthorizationRoute);
app.use("/application", ApplicationRouter);

app.use(cookieParser())
app.use(responseTime())

const port =  process.env.PORT || 3000
app.listen(port, () => {console.log(`listening on PORT: ${port}`)} )

//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------

// MONGODB RELATED 

const db = client.db('CS4241')
const collection = db.collection('data')
const database = keys.database.database;
const c_data = keys.database.c_d;

//Add middleware to check connection
app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.post("/AddRecord", (req, res)=>{
  const user = req.user.username;
  eachColumn = JSON.parse(req.json);
  ec = JSON.parse(eachColumn);

  const json = {
    studentName: ec.value,
    a1score: ec.value,
    a2score: ec.value,
    projectSc: ec.value,
    examScore: ec.value,
    user: req.user.username
  };
  addGradeColumn(user, json, database, c_data,);
  res.end();

});

async function addGradeColumn(user, json, database, c_data,){
  const studentName = json.studentName,
        a1score = json.a1score,
        a2score = json.a2score,
        projectSc = json.projectSc,
        examScore = json.examScore,
        finalScore = finalGrade(newStudent.a1score, newStudent.a2score, newStudent.projectSc, newStudent.examScore)
        //       newStudent.finalScore = finalGrade(newStudent.a1score, newStudent.a2score, newStudent.projectSc, newStudent.examScore)

  try{
    console.log(`Connected to ${database}, Collection: ${c_data}`);
    const db = client.db(database);
    const allData = db.collection(c_data);
    console.log("!!Connected to the data succesfully!!")

    const column = {
      studentName: studentName,
      a1score: a1score,
      a2score:  a2score,
      projectSc: projectSc,
      examScore: examScore,
      finalScore: finalScore,
      user: user
    };

    const result = await allData.insertOne(column);

    console.log(`A new column with object_id: ${result.insertedId} has been added to the data collection`);

  } catch{
    console.log("error occure while adding a document to database");
  }
}


// client.connect()
//   .then( () => {
//     // will only create collection if it doesn't exist
//     return client.db( 'XXXtest' ).collection( 'XXXtodos' )
//   })
//   .then( __collection => {
//     // store reference to collection
//     collection = __collection
//     // blank query returns all documents
//     return collection.find({ }).toArray()
//   })
//   .then( console.log )
  
// // route to get all docs
// app.get( '/', (req,res) => {
//   if( collection !== null ) {
//     // get array and pass to res.json
//     collection.find({ }).toArray().then( result => res.json( result ) )
//   }
// })


// const http = require( 'http' ),
//       fs   = require( 'fs' ),
//       // IMPORTANT: you must run `npm install` in the directory for this assignment
//       // to install the mime library used in the following line of code
//       mime = require( 'mime' ),
//       dir  = 'public/',
//       port = 3000

// const appdata = [
// ]
//   // { 'studentName': 'Roopsa', 'a1score': 90, 'a2score': 90, 'Project Score': 91, 'Exam Score': 'A'},
//   // { 'studentName': 'Hota', 'a1score': 82, 'a2score': 82, 'Project Score': 81, 'Exam Score': 'B'},
//   // { 'studentName': 'Sahana', 'a1score': 75, 'a2score': 75, 'Project Score':751, 'Exam Score': 'C'} 
// const server = http.createServer( function( request,response ) {
//   if( request.method === 'GET' ) {
//     handleGet( request, response )    
//   }else if( request.method === 'POST' ){
//     handlePost( request, response ) 
//   }
// })

// const handleGet = function( request, response ) {
//   const filename = dir + request.url.slice( 1 ) 

//   if( request.url === '/' ) {
//     sendFile( response, 'public/login.html' )
//   }else{
//     sendFile( response, filename )
//   }
// }

// const handlePost = function( request, response ) {
//   let dataString = ''

//   request.on( 'data', function( data ) {
//       dataString += data 
//       console.log("-----------")
//       console.log(dataString)
//   })

//   request.on( 'end', function() {
//     if(request.url === "/submit"){
//       //console.log( JSON.parse( dataString ) )

//       let newStudent = JSON.parse(dataString)
//       newStudent.finalScore = finalGrade(newStudent.a1score, newStudent.a2score, newStudent.projectSc, newStudent.examScore)

//       appdata.push(newStudent)

//     } else if (request.url === '/delete'){
//       let i = JSON.parse( dataString ).index
//       appdata.splice( i, 1 )
//       //console.log(appdata)
//     }

  
//     response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
//     response.end(JSON.stringify(appdata))
//   })
// }

// const sendFile = function( response, filename ) {
//    const type = mime.getType( filename ) 

//    fs.readFile( filename, function( err, content ) {

//      // if the error = null, then we've loaded the file successfully
//      if( err === null ) {

//        // status code: https://httpstatuses.com
//        response.writeHeader( 200, { 'Content-Type': type })
//        response.end( content )

//      }else{

//        // file not found, error code 404
//        response.writeHeader( 404 )
//        response.end( '404 Error: File Not Found' )

//      }
//    })
// }


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

// server.listen( process.env.PORT || port )
