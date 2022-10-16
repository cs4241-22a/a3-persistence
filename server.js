const express = require('express'),
    app = express(),
    port = 3000

const appData = {
    stats: { entries: 0, mean: null, median: null, mode: [] },
    data: [],
}

app.use(express.json())

// this will most likely be 'build' or 'public'
app.use(express.static('build'))

app.get('/update', (req, res) => res.json(appData))

app.post('/add', (req, res) => {
    console.log("S: Added " + req.body.num + " to List " + appData.data);
    appData.data[appData.data.length] = req.body.num;
    appData.stats = mathUpdateHelper(appData);
    res.json(appData)
})

app.post('/remove', (req, res) => {
    console.log(
        "S: Removed # with index " + req.body.index + " from List " + appData.data
    );
    let data = appData.data;
    data.splice(req.body.index, 1);
    appData.data = data;
    appData.stats = mathUpdateHelper(appData);
    res.json(appData);
})

function mathUpdateHelper(toCalc) {
    console.log("S: Recalculating Stats");
    let numbers = toCalc.data.sort(function (a, b) {
        return a - b;
    });
    let total = 0,
        count = numbers.length,
        median = 0,
        modes = [],
        counts = [],
        modeNum,
        maxIndex = 0;

    for (let i in numbers) {
        total += parseFloat(numbers[i]);
        modeNum = numbers[i];
        counts[modeNum] = (counts[modeNum] || 0) + 1;
        if (counts[modeNum] > maxIndex) {
            maxIndex = counts[modeNum];
        }
    }

    for (let i in counts)
        if (counts.hasOwnProperty(i)) {
            if (counts[i] === maxIndex) {
                modes[modes.length] = i;
            }
        }

    if (count % 2 == 0)
        median =
            (parseFloat(numbers[count / 2 - 1]) + parseFloat(numbers[count / 2])) / 2;
    else median = numbers[(count - 1) / 2];

    const stats = {
        entries: count,
        total: total,
        mean: Math.round((total / count) * 1000) / 1000,
        median: Math.round(median * 1000) / 1000,
        mode: modes,
    };

    return stats;
}

app.listen(process.env.PORT || port)