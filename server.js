const PORT = 3000;
const express = require('express');
const path = require('path');

const app = express();

app.listen(PORT, () => {
    console.log('Now listening on port ' + PORT);
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public", "index.html"));
});

app.get("/play", (req, res) => {
    res.sendFile(path.join(__dirname, "/public", "game.html"));
});

app.get("*", (req, res) => {
    res.send("Error: 404!");
});