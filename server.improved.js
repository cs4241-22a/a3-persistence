require('dotenv').config()
const express = require('express'),
      app     = express(),
      cookie  = require('cookie-session'),
      hbs     = require('express-handlebars').engine,
      appdata = []
const { json } = require('express');
const { MongoClient, ServerApiVersion, ReadConcern } = require('mongodb');

var username = ''

//==========MONGODB================
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'datatest' ).collection( 'test' )
  })
  .then( collection => {
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )


  app.use( (req,res,next) => {
    if( client.db.collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
  })

  let c = client.db('datatest').collection('test')


  //===========EXPRESS=========================
app.use(express.static('./public'))
app.use( express.urlencoded({ extended: true}))
app.use(express.json())

app.engine('handlebars',hbs())
app.set('view engine', 'handlebars')
app.set('views', './views')


app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))


app.post( '/new_account', (req,res)=> {
  
  new_username = req.body.new_username
  new_password = req.body.new_password


  c.findOne({'_username': new_username, '_password': new_password}).then(data => {
    if(data===null){
      c.insertOne({'_username': new_username,'_password':new_password})
      res.render('index',{msg:'successfully created account!',layout:false})
    }
    else {
      res.render('index',{msg:'username/password pair already exists',layout:false})
    }
  })
})


app.post( '/login', (req,res)=> {
  
  c.findOne({'_username': req.body.username, '_password': req.body.password}).then(data => {
    if(data===null){
      // cancel session login in case it was previously set to true
      req.session.login=false
      // password incorrect, send back to login page
      res.render('index', { msg:'login failed, please try again', layout:false })
    }
    else {
      username = req.body.username
      req.session.login = true
      res.redirect('table.handlebars')
    }
  })
})




app.get('/',(req,res) => {
  res.render('index',{msg:'',layout:false})
})


// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('index', {msg: 'login failed, please try again', layout:false })
})

app.get('/table.handlebars',(req,res) =>{
  res.render('table', {msg:'Success! You have logged in.', layout:false})
})






//===================EVERYTHING FOR TABLE.HANDLEBARS BELOW==========================


app.get('/getrequest',(req,res) =>{
  res.writeHead( 200, "OK", {'Content-Type': 'application/json' })

  c.find({'username':username}).toArray().then(data => {
   res.end(JSON.stringify(data))
  })



})

app.get('/getdelete',(req,res) =>{
 res.writeHead( 200, "OK", {'Content-Type': 'application/json' })
  c.find({'username':username}).toArray().then(data => {
    res.end(JSON.stringify(data)) 
  })
})



app.post('/submit', (req,res) => {
  // let dataString = ''

  // req.on( 'data', function( data ) {
  //     dataString += data 
  // })
      
   //date submitted
   dataString = req.body
   let date_submitted = dataString.date
   //current date
   var date = new Date();
   var current_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()
   var date1 = new Date(JSON.stringify(current_date))
   var date2 = new Date(JSON.stringify(date_submitted))
   var Difference_In_Time = date2.getTime() - date1.getTime();
   var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
   let newString = dataString
   //# of days before assignment due
   newString.time_until = Difference_In_Days
   newString.username = username
   appdata.push(newString)

  c.insertOne(newString) //INSERT DATA INTO MONGODB DOCUMENT

    res.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    res.end( JSON.stringify (appdata))//APP DATA
})


app.post('/delete', (req,res) => {



   //modify our appdata by removing the assignment
   //removeThis gets you the name of the assignment to remove
   let removeThis = req.body.remove_assignment
   //remove the assignment by it's name here?
   appdata.forEach((item, index, arr) =>{
    if(item.assignment===removeThis){
      arr.splice(index,1);
    }
  })

    c.deleteOne({'username':username, 'assignment':removeThis})
    res.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    res.end( JSON.stringify (appdata))//APP DATA

})



app.post('/modify', (req,res) => {

  
  modify_assignment_input = req.body.modify_assignment_input
  corresponding_course = req.body.corresponding_course
  modified_assignment_input = req.body.modified_assignment_input
  modified_course_input = req.body.modified_course_input
  modified_due_date_input = req.body.modified_due_date_input

  //.updateOne({ assignment: { $eq: modify_assignment_input}},{$set:{course:modified_course_input}})
  let date_submitted = modified_due_date_input
  var date = new Date();
  var current_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()
  var date1 = new Date(JSON.stringify(current_date))
  var date2 = new Date(JSON.stringify(date_submitted))
  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  newTimeUntil = Difference_In_Days


  c.updateOne({ assignment:{ $eq: modify_assignment_input},username:{$eq: username}},{$set:{assignment: modified_assignment_input,course:modified_course_input, date:modified_due_date_input, time_until: newTimeUntil}});


    res.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    res.end(JSON.stringify(appdata))

})








app.listen( process.env.PORT || 3000 )