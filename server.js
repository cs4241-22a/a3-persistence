const express = require("express");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const path = require('path');
const { response } = require("express");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`);
});

let users = [
    {
        username: "testUser",
        password: "password",
    }
];


app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/welcome', function (req, res) {
    res.send('<b><h1>Hello World!</h1></b>');
});

app.get('/register', function (req, res) {
   res.sendFile('/views/index.html'); 
});

app.post('/register', async function (req, res) {

    try {
        console.log("Registering....");
        const newUser = req.body.username;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        if (users.find(newUser => users.username === newUser)) {
            console.log("User already registered");
            return;
        }

        let json = {
            username: newUser,
            password: hashedPassword
        }
        users.push(json);

        res.writeHead(200, "OK", {
            "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(json));

        return;

    } catch {
        res.writeHead(500, "ERROR");
        res.end();
    }
    
});