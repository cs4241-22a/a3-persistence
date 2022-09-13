
const express = require('express');
const app = express()
const Contenedora = require(__dirname+'index.js')
const productos = new Contenedora(__dirname+"articulos.txt")
const PORT = process.env.PORT
const server = app.listen(PORT,()=>{
    console.log("Listen servise ..."+server.address().port)
})

app.get('/productos',(req,res)=>{
    res.send(productos.getAll())
})
app.get('/productoRandom',(req,res)=>{
    res.send(productos.getByIdRandom())
})
server.on("Error",()=>{
    console.log('Error')
})



const express = require('express');
const app = express()
const Contenedora = require('./index.js')
const productos = new Contenedora("./articulos.txt")
const PORT = process.env.PORT
const server = app.listen(PORT,()=>{
    console.log("Listen servise ..."+server.address().port)
})

app.get('/productos',(req,res)=>{
    res.send(productos.getAll())
})
app.get('/productoRandom',(req,res)=>{
    res.send(productos.getByIdRandom())
})
server.on("Error",()=>{
    console.log('Error')
})