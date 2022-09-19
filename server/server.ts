import express from "express"
import http, {IncomingMessage, ServerResponse} from "http"

const app = express(),
    dreams: string[] = [];

app.use(express.static('public'));
app.use(express.json());

app.post('/submit', (req, res) => {
    dreams.push(req.body.newdream);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dreams));
});

app.listen( process.env.PORT );
