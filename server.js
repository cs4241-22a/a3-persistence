const express    = require('express'),
      path       = require('path'),
      app        = express();

const test = ["Sean", "Catie", "Blaise"]

app.use(express.static(path.join(__dirname, 'public')));

app.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/main.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.use( express.json() );

//POST Request Example
app.post('/submit', (req, res) => {
    test.push( req.body )
    res.writeHead( 200, { 'Content-Type': 'application/json' })
    res.end( JSON.stringify( test ) )
});

//GET Request (Data) Example
app.get('/table', (req, res) => {
    res.end(JSON.stringify(test))
})

app.listen( process.env.PORT || 3000)