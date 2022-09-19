const { response } = require('express')

const express = require( 'express' ),
      app = express(),
      port = 3000

let reminders = []

app.use(express.static('public'))
app.use(express.static('views' )) 

/*const handleGet = (request, response) => {
  console.log('in get')
  console.log(request.url)
  switch (request.url) {
    case '/api/getdata':
      console.log('sending data back to client')
      console.log(reminders)
      response.writeHeader(200, {'Content-Type': 'text/plain'})
      response.end(JSON.stringify(reminders))
      break
    default:
      break
  }
}*/

//app.use(handleGet)

app.get('/api/getdata', (request, response) => {
  response.writeHeader(200, {'Content-Type': 'text/plain'})
  response.end(JSON.stringify(reminders))
})

const handlePost = (request, response, next) => {
  let dataString = ''

  request.on('data', (data) => {
      dataString += data 
  })

  request.on('end', () => {
    let data = JSON.parse(dataString)

    switch (request.url) {
      case '/api/newreminder':
        console.log('new data incoming')
        reminders.push(data)
        console.log(reminders)
        response.writeHead(200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
      case '/api/deletereminder':
        console.log('new delete data incoming')
        reminders = reminders.filter((element) => {
          return JSON.stringify(element) != JSON.stringify(data) //element.title !== data.title
        })
        console.log(reminders)
        response.writeHead(200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
      default:
        console.log("ERROR")
        break
    }

    next()
  })
}

app.use(handlePost)

app.listen(process.env.PORT || port)
