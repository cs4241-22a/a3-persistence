const PORT = 3000;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
var passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const cors = require("cors");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { mongo } = require('mongoose');
const e = require('express');
const { rmSync } = require('fs');
const uri = "mongodb+srv://r2pen2:nim26Jmd!@cluster0.clsagc1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.listen(PORT, () => {
    console.log('Now listening on port ' + PORT);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public", "index.html"));
});

app.get("/play", (req, res) => {
    res.sendFile(path.join(__dirname, "/public", "game.html"));
});

app.get("/puzzle", (req, resp) => {
    const boardId = req.query.id;
    // Fetch board from DB

    if (boardId == -1) {
        // Fetch most recent
        client.connect((err, client) => {
            if (err) {
                throw err;
            } else {
                const db = client.db("db1");
                db.collection("puzzles").findOne({}, {sort:{'$natural':-1}}, (err, res) => {
                    if (err) {
                        throw err;
                    } else {
    
                        const body = {
                            mines: res.mines,
                            title: res.title,
                            board: res._id
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    }
                })
            }
        })
    } else {
        client.connect((err, client) => {
            if (err) {
                throw err;
            } else {
                const db = client.db("db1");
                db.collection("puzzles").findOne({"_id": new ObjectId(boardId)}, {}, (err, res) => {
                    if (err) {
                        throw err;
                    } else {
                        const body = {
                            mines: res.mines,
                            title: res.title
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    }
                })
            }
        })
    }
})

app.get("/puzzle-list", (req, resp) => {
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("puzzles").find({}, {sort:{'createdAt':1}}).limit(25).toArray((err, res) => {
                if (err) {
                    throw err;
                } else {
                    const body = [];
                    res.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    })
                    for (const item of res) {
                        body.push({id: item._id, title: item.title});
                    }
                    resp.json(JSON.stringify(body));
                    resp.end();
                }
            })
        }
    })
})

function generateMineLayout() {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let mines = [];
    for (let i = 0; i < 32; i++) {
        let newSpace = false;
        while (!newSpace) {
            const randomSpace = getRandomInt(255);
            if (!mines.includes(randomSpace)) {
                newSpace = true;
                mines.push(randomSpace);
            }
        }
    }
    return mines;
}

function getPuzzleTitle(date) {
    return "Minesweeperdle: " + getDateString(date);
}

function getDateString(date) {
    const d = new Date(date)
    const day = d.getUTCDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    var monthString = ""
    switch (month) {
        case 0:
            monthString = "January";
            break;
        case 1:
            monthString = "February";
            break;
        case 2:
            monthString = "March";
            break;
        case 3:
            monthString = "April";
            break;
        case 4:
            monthString = "May";
            break;
        case 5:
            monthString = "June";
            break;
        case 6:
            monthString = "July";
            break;
        case 7:
            monthString = "August";
            break;
        case 8:
            monthString = "September";
            break;
        case 9:
            monthString = "October";
            break;
        case 10:
            monthString = "November";
            break;
        case 11:
            monthString = "December";
            break;
        default:
            monthString = "";
            break;
    }

    return monthString + " " + day + ", " + year;
}

function createNewPuzzleOnDb(puzzleDate) {
    const mines = generateMineLayout();
    const puzzleTitle = getPuzzleTitle(puzzleDate);
    var puzzle = {
        title: puzzleTitle,
        mines: mines,
        createdAt: new Date()
    }
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("puzzles").insertOne(puzzle, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    console.log("New puzzle sent to database!");
                }
            })
        }
    })
    setTimeout(() => {
        createNewPuzzleOnDb(new Date());
    }, 86400000); // Make a new puzzle in 24 hours
    client.close();
}
app.get("/get-data", (req, res) => {

})

var launchTime = new Date();
var msUntilSend = new Date(launchTime.getFullYear(), launchTime.getMonth(), launchTime.getDate(), 9, 0, 0, 0) - launchTime;
if (msUntilSend < 0) {
    msUntilSend += 86400000; // it's after 9am
}
setTimeout(() => {
    createNewPuzzleOnDb(new Date());
}, msUntilSend);



app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/public", "login.html"));
});

app.get('/new-user', (req, res) => {
    res.sendFile(path.join(__dirname, "/public", "newUser.html"));
});

app.post("/new-user", (req, resp) => {
    const data = req.body;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("users").findOne({"email": data.email}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (res) {
                        const body = {
                            error: true
                        }
                        console.log("User already exists.");
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        bcrypt.hash(data.password, saltRounds, function(err, hash) {
                            const newUser = {
                                email: data.email,
                                password: hash,
                                saveData: data.progressCheck,
                                history: []
                            }
                            db.collection("users").insertOne(newUser, (err, res) => {
                                if (err) {
                                    throw err;
                                } else {
                                    console.log("New user sent to database!");
                                    const body = {
                                        error: false,
                                        email: data.email,
                                    }
                                    resp.json(JSON.stringify(body));
                                    resp.end();
                                }
                            })
                        });
                    }
                }
            })
        }
    })
})

app.post("/existing-user", (req, resp) => {
    const data = req.body;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("users").findOne({"email": data.email}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        const body = {
                            error: true
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        const hash = res.password;
                        bcrypt.compare(data.password, hash, (err, bcryptres) => {
                            if (bcryptres) {
                                const body = {
                                    error: false,
                                    email: data.email,
                                }
                                resp.json(JSON.stringify(body));
                                resp.end();
                            } else {
                                const body = {
                                    error: true
                                }
                                resp.json(JSON.stringify(body));
                                resp.end();
                            }
                        })
                    }
                }
            })
        }
    })
})


app.get('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname, "/public", "existingUser.html"));
});

app.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "/public", "userData.html"));
})

app.get("/game-result", (req, resp) => {
    const user = req.query.user;
    const board = req.query.puzzle;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("users").findOne({"email": user}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        const body = {
                            error: true
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        let reqBoard = null;
                        for (const h of res.history) {
                            if (h.board === board) {  
                                reqBoard = h;
                            }
                        }
                        resp.json(JSON.stringify(reqBoard));
                        resp.end();
                    }
                }
            })
        }
    })
})

app.post("/send-game", (req, resp) => {
    const data = req.body;
    console.log(data)
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            console.log("Adding history for user: " + data.user);
            db.collection("users").findOne({"email": data.user}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        const body = {
                            error: true
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        if (!res.saveData) {
                            const body = {
                                fail: true
                            }
                            resp.json(JSON.stringify(body));
                            resp.end();
                        } else {
                            const newHistory = res.history;
                            newHistory.push({
                                board: data.puzzle,
                                flags: data.flags,
                                clicks: data.clicks,
                                result: data.won
                            });
                            db.collection("users").updateOne({"email": data.user}, { $set: {history: newHistory} }, (err, result) => {
                                if (err) {
                                    throw err;
                                } else {
                                    const body = {
                                        error: false
                                    }
                                    resp.json(JSON.stringify(body));
                                    resp.end();
                                }
                            });   
                        }
                    }
                }
            })
        }
    })
})

app.get("/fetch-user-data", (req, resp) => {
    const id = req.query.id;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("users").findOne({"_id": new ObjectId(id)}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        const body = {
                            error: true
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        const body = {
                            id: res._id,
                            email: res.email,
                            saveData: res.saveData,
                            history: res.history
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    }
                }
            })
        }
    })
})

app.get("/user-id", (req, resp) => {
    const email = req.query.email;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("users").findOne({"email": email}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        const body = {
                            error: true
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        const body = {
                            id: res._id
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    }
                }
            })
        }
    })
});

app.post("/delete-history", (req, resp) => {
    const data = req.body;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("users").findOne({"_id": new ObjectId(data.userId)}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        const body = {
                            success: false
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        if (!res.saveData) {
                            const body = {
                                success: false
                            }
                            resp.json(JSON.stringify(body));
                            resp.end();
                        } else {
                            const newHistory = res.history.filter(h => h.board !== data.boardId);
                            db.collection("users").updateOne({"_id": new ObjectId(data.userId)}, { $set: {history: newHistory} }, (err, result) => {
                                if (err) {
                                    throw err;
                                } else {
                                    const body = {
                                        success: true
                                    }
                                    resp.json(JSON.stringify(body));
                                    resp.end();
                                }
                            });   
                        }
                    }
                }
            })
        }
    })
})

app.post("/change-email", (req, resp) => {
    const data = req.body;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("users").findOne({"_id": new ObjectId(data.userId)}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        const body = {
                            success: false
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        if (!res.saveData) {
                            const body = {
                                success: false
                            }
                            resp.json(JSON.stringify(body));
                            resp.end();
                        } else {
                            db.collection("users").updateOne({"_id": new ObjectId(data.userId)}, { $set: {email: data.newEmail} }, (err, result) => {
                                if (err) {
                                    throw err;
                                } else {
                                    const body = {
                                        success: true
                                    }
                                    resp.json(JSON.stringify(body));
                                    resp.end();
                                }
                            });   
                        }
                    }
                }
            })
        }
    })
})

app.post("/delete-user", (req, resp) => {
    const data = req.body;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("users").deleteOne({"_id": new ObjectId(data.userId)}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        const body = {
                            success: false
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        const body = {
                            success: true
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    }
                }
            })
        }
    })
})

app.post("/change-save-setting", (req, resp) => {
    const data = req.body;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            const db = client.db("db1");
            db.collection("users").findOne({"_id": new ObjectId(data.userId)}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        const body = {
                            success: false
                        }
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        db.collection("users").updateOne({"_id": new ObjectId(data.userId)}, { $set: {saveData: data.newSetting} }, (err, result) => {
                            if (err) {
                                throw err;
                            } else {
                                const body = {
                                    success: true
                                }
                                resp.json(JSON.stringify(body));
                                resp.end();
                            }
                        });   
                    }
                }
            })
        }
    })
})

app.get("*", (req, res) => {
    res.send("Error: 404!");
});