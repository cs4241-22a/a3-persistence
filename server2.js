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
const passportSetUp = require("./config/passportSetUp");
const client = require("./config/mongodbSetUp");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
var cookieParser = require("cookie-parser")
const ApplicationRouter = require("./route/grader_route");
const { stringify } = require("querystring");
var responseTime = require('response-time');
const { json, urlencoded } = require("express");
app = express();

app.use(express.json())
app.use(urlencoded({extended:true}))

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

const db = client.db('CS4241')
const collection = db.collection('data')


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
};

app.post('/AddRecord', (req,res) => {
    console.log(req.body);
    const student_name = req.body.studentName
    const a1 = req.body.a1score
    const a2 = req.body.a2score
    const project_score = req.body.projectSc
    const exam_score = req.body.examScore
    const final_score = finalGrade(a1,a2,project_score,exam_score)
    const user = req.user.username;

    const docs = {
        studentName: student_name,
        a1score: a1,
        a2score: a2,
        projectSc: project_score,
        examScore: exam_score,
        final_score: final_score,
        user: user
      };
      console.log("_____",docs)
    collection.insertOne(docs).then(result => {
        if (result) {
            console.log('success')
            //res.json(collection.findOne({ studentName: 3131}))
            //console.log()
            //collection.deleteOne({ _id:MongoClient.ObjectId( '6344319fd97f41bff58e7267' ) })
            //res.json(result);
            //let newStudent = JSON.parse(docs)
            res.redirect('/login')
        } else {
            console.log('failuer')
            res.redirect('/login')
        }

    }).catch(err => {
        console.log('/insert failed',err)
    })
})

app.get('/login', (req,res) => {
    res.redirect('/login.html')
})

const port =  process.env.PORT || 3000
app.listen(port, () => {console.log(`listening on PORT: ${port}`)} )