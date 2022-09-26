const { v4: uuidv4 } = require('uuid');
const http = require('http');
const fs = require('fs');
const mime = require('mime');
const dir = 'public/';
const port = 3000;

const appdata = {
    summary: {
        averageTimeAsleep: 0,
        averageSleepRating: 0,
        dreamPercentage: 0,
        numberOfRecords: 0
    },
    sleepData: {}
}

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    } else if (request.method === 'DELETE') {
        handleDelete(request, response)
    }
})

const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1)
    const url = request.url.toLowerCase();
    switch (url) {
        case '/':
            sendFile(response, 'public/index.html');
            break;
        case '/getdata':
            sendData(response);
            break;
        default:
            sendFile(response, filename)
    }
}

const handlePost = function (request, response) {
    let dataString = ''

    request.on('data', function (data) {
        dataString += data
    })

    request.on('end', function () {
        const data = JSON.parse(dataString);
        const summary = appdata.summary;

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
        appdata.sleepData[data.id] = data;

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        response.end(JSON.stringify({summary: summary, id: data.id}))
    })
}

const handleDelete = function (request, response) {
    let dataString = ''

    request.on('data', function (data) {
        dataString += data
    })

    request.on('end', function () {
        const data = JSON.parse(dataString);
        const summary = appdata.summary;
        const sleepData = appdata.sleepData;
        if(Object.hasOwn(sleepData, data.id)) {
            summary.numberOfRecords--;
            delete sleepData[data.id];
        }

        if(summary.numberOfRecords > 0) {
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

        response.writeHead(200, "OK", {'Content-Type': 'application/json'});
        response.end(JSON.stringify(summary));
    })
}

const sendData = function (response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(appdata))
}

const sendFile = function (response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {

            // status code: https://httpstatuses.com
            response.writeHead(200, {'Content-Type': type})
            response.end(content)

        } else {

            // file not found, error code 404
            response.writeHead(404)
            response.end('404 Error: File Not Found')

        }
    })
}


const getHoursDiff = function (startDate, endDate) {
    const msInHour = 1000 * 60 * 60;
    return Number((Math.abs(endDate - startDate) / msInHour).toFixed(2));
}

server.listen(process.env.PORT || port)
