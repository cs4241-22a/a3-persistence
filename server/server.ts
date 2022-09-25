import express from "express"

process.env.PORT = '3000';

const app = express(),
    dreams: string[] = [];

app.use(express.static('src'));
app.use(express.json());

app.post('/submit', (req, res) => {
    dreams.push(req.body.newdream);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dreams));
});

app.listen( process.env.PORT );
