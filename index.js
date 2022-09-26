const GitHubStrategy = require('passport-github2').Strategy;
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const session = require('express-session');
const passport = require('passport');
const express = require('express')
const {v4: uuidv4} = require("uuid");
const app = express()
const PORT = process.env.PORT || 3000
let collection = null
require('dotenv').config()

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@a3-assignment.o7vkxfj.mongodb.net/?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1
});
mongoClient.connect()
    .then(client => client.db('sleep-data').collection('sleep-data'))
    .then(_collection => {
        collection = _collection
    });

const defaultSleepData = {
    summary: {
        averageTimeAsleep: 0, averageSleepRating: 0, dreamPercentage: 0, numberOfRecords: 0
    }, sleepData: {}
}

app.use(express.static('public'));
// app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'sadf;lkjsdflkjas;dlkjnvjkeiruf', resave: false, saveUninitialized: true
}))

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GH_CLIENT_ID,
    clientSecret: process.env.GH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/github')
    }
}

app.use(passport.initialize());

app.use(passport.session());

app.get('/auth/error', (req, res) => res.send('Unknown Error'))

app.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}));

app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/auth/error'}), function (req, res) {
    res.redirect('/');
});

app.get('/', isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/protected/index.html');
})

app.get('/test', async (req, res) => {
    if (collection) {
        let x = await collection.find({user: 'memerson12'}).toArray()
        res.json(x);
    } else {
        console.log('L')
        res.send('L')
    }
})

app.get('/getData', async (req, res) => {
    let sleepData = (await collection.findOne({user: req.user['username']}))
    if (!sleepData) {
        sleepData = defaultSleepData;
        await collection.insertOne({
            user: req.user['username'], data: sleepData
        })
    } else {
        sleepData = sleepData['data'];
    }
    const userData = {
        displayName: req.user['displayName'], avatarUrl: req.user['_json']['avatar_url']
    }
    res.json({...sleepData, userData: userData});
})

app.post('/submit', async (req, res) => {
    const data = req.body;
    let sleepData = (await collection.findOne({user: req.user['username']}))
    const summary = sleepData['data'].summary;
    // console.log(req.body);
    const bedTime = new Date(data.timeSleep);
    const timeAwake = new Date(data.timeWakeUp);
    const hoursSlept = getHoursDiff(bedTime, timeAwake);

    summary.numberOfRecords++;

    const averageTimeAsleepChange = (hoursSlept - summary.averageTimeAsleep) / summary.numberOfRecords;
    const averageSleepRatingChange = (data.sleepRating - summary.averageSleepRating) / summary.numberOfRecords;
    const dreamPercentageChange = (data.hadDream - summary.dreamPercentage) / summary.numberOfRecords;

    summary.averageTimeAsleep += averageTimeAsleepChange;
    summary.averageSleepRating += averageSleepRatingChange;
    summary.dreamPercentage += dreamPercentageChange;

    data.id = uuidv4();
    data.hoursSlept = hoursSlept;
    sleepData['data']['sleepData'][data.id] = data;
    console.log(sleepData);
    await collection.updateOne({_id: ObjectId(sleepData['_id'])}, {
        $set: {
            'data.summary': summary, 'data.sleepData': sleepData['data']['sleepData']
        }
    })

    res.json({summary: summary, id: data.id});
})

app.patch('/entry', async (req, res) => {
    const data = req.body;
    let mongoData = (await collection.findOne({user: req.user['username']}));
    const summary = mongoData['data'].summary;
    const id = data.id;
    const sleepData = mongoData['data'].sleepData;
    if (Object.hasOwn(sleepData, data.id)) {
        console.log('deleting')
        summary.numberOfRecords--;
        delete sleepData[data.id];
    }
    if (summary.numberOfRecords > 0) {
        let totalHoursSlept = 0;
        let totalSleepRating = 0;
        let totalDreamPercentage = 0;
        for (const record of Object.values(sleepData)) {
            totalHoursSlept += record.hoursSlept;
            totalSleepRating += record.sleepRating;
            totalDreamPercentage += record.hadDream;
        }
        summary.averageTimeAsleep = totalHoursSlept / summary.numberOfRecords;
        summary.averageSleepRating = totalSleepRating / summary.numberOfRecords;
        summary.dreamPercentage = totalDreamPercentage / summary.numberOfRecords;
    } else {
        summary.averageTimeAsleep = 0;
        summary.averageSleepRating = 0;
        summary.dreamPercentage = 0;
    }

    await collection.updateOne({_id: ObjectId(mongoData['_id'])}, {
        $set: {'data.summary': summary},
        $unset: {[`data.sleepData.${data.id}`]: ""}
    })

    const bedTime = new Date(data.timeSleep);
    const timeAwake = new Date(data.timeWakeUp);
    const hoursSlept = getHoursDiff(bedTime, timeAwake);

    summary.numberOfRecords++;

    const averageTimeAsleepChange = (hoursSlept - summary.averageTimeAsleep) / summary.numberOfRecords;
    const averageSleepRatingChange = (data.sleepRating - summary.averageSleepRating) / summary.numberOfRecords;
    const dreamPercentageChange = (data.hadDream - summary.dreamPercentage) / summary.numberOfRecords;

    summary.averageTimeAsleep += averageTimeAsleepChange;
    summary.averageSleepRating += averageSleepRatingChange;
    summary.dreamPercentage += dreamPercentageChange;

    data.id = id
    data.hoursSlept = hoursSlept;
    mongoData['data']['sleepData'][id] = data;
    console.log(sleepData);
    await collection.updateOne({_id: ObjectId(mongoData['_id'])}, {
        $set: {
            'data.summary': summary, 'data.sleepData': mongoData['data']['sleepData']
        }
    })

    res.json({summary: summary, id: id});
})

app.delete('/deleteEntry', async (req, res) => {
    const data = req.body;
    let mongoData = (await collection.findOne({user: req.user['username']}));
    const summary = mongoData['data'].summary;

    const sleepData = mongoData['data'].sleepData;
    if (Object.hasOwn(sleepData, data.id)) {
        console.log('deleting')
        summary.numberOfRecords--;
        delete sleepData[data.id];
    }
    if (summary.numberOfRecords > 0) {
        let totalHoursSlept = 0;
        let totalSleepRating = 0;
        let totalDreamPercentage = 0;
        for (const record of Object.values(sleepData)) {
            totalHoursSlept += record.hoursSlept;
            totalSleepRating += record.sleepRating;
            totalDreamPercentage += record.hadDream;
        }
        summary.averageTimeAsleep = totalHoursSlept / summary.numberOfRecords;
        summary.averageSleepRating = totalSleepRating / summary.numberOfRecords;
        summary.dreamPercentage = totalDreamPercentage / summary.numberOfRecords;
    } else {
        summary.averageTimeAsleep = 0;
        summary.averageSleepRating = 0;
        summary.dreamPercentage = 0;
    }

    await collection.updateOne({_id: ObjectId(mongoData['_id'])}, {
        $set: {'data.summary': summary},
        $unset: {[`data.sleepData.${data.id}`]: ""}
    })
    res.json(summary);
})

const getHoursDiff = function (startDate, endDate) {
    const msInHour = 1000 * 60 * 60;
    return Number((Math.abs(endDate - startDate) / msInHour).toFixed(2));
}

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
