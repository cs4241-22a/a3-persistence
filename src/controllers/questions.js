const { ObjectId } = require("mongodb")
const client = require("../database.js")
function index(req, res){
    client.connect().then(()=>{
        client.db( 'government' ).collection( 'questions' )
        .find({}).toArray()
        .then((response)=>{
            res.render("questions", {questions: response} )
        })
        .catch((err)=>res.send(err.message))
     })
   
}
function create(req, res){
 client.connect().then(()=>{
    client.db( 'government' ).collection( 'questions' )
    .insertOne({text: req.body.text})
    .then(()=>{
        res.redirect("/questions")
    })
    .catch((err)=>res.send(err.message))
 })
}

function edit(req, res){
    client.connect().then(()=>{
       client.db( 'government' ).collection( 'questions' )
       .findOne({_id :ObjectId(req.params.id)})
       .then((response)=>{
         res.render("editQuestion", {question: response })
       })
       .catch((err)=>res.send(err.message))
    })
   }
   

function update(req, res){
    
    client.connect().then(()=>{
      const collection=  client.db( 'government' ).collection( 'questions' )
       .updateOne({_id :ObjectId(req.params.id)}, {$set: {text:req.body.text}})
       .then((response)=>{
         res.redirect("/questions")
       })
       .catch((err)=>res.send(err.message))
    })
   }
   
function destroy(req, res){
   
    client.connect().then(()=>{
       client.db( 'government' ).collection( 'questions' )
       .deleteOne({_id :ObjectId(req.params.id)})
       .then(()=>{
           res.redirect("/questions")
       })
       .catch((err)=>res.send(err.message))
    })
   }
module.exports = { index, create, destroy, edit, update}