const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

let appdata = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    console.log(JSON.parse(dataString));

    // ... do something with the data here!!!
    const parsedDataString = JSON.parse(dataString);

    if (parsedDataString["action"] === "new") {
      console.log("[server]: NEW REQ");
      function guidGenerator() {
        const S4 = function () {
          return (((1 + Math.random()) * 0x10000) | 0)
            .toString(16)
            .substring(1);
        };
        return (
          S4() +
          S4() +
          "-" +
          S4() +
          "-" +
          S4() +
          "-" +
          S4() +
          "-" +
          S4() +
          S4() +
          S4()
        );
      }
      const due_date = new Date();
      due_date.setDate(due_date.getDate() + parseInt(parsedDataString["days_to_complete"]))
      appdata.push({
        task: parsedDataString["task"],
        status: 0,
        other: due_date,
        guid: guidGenerator(),
      });
    } else if (parsedDataString["action"] === "edit") {
      // swap status for this GUID
      console.log("[server]: MODIFY REQ");
      const isSameGUID = (element) =>
        element["guid"] === parsedDataString["task_guid"];
      const foundTaskIndex = appdata.findIndex(isSameGUID); // find appdata with same guid
      appdata[foundTaskIndex]["status"] = 1 - appdata[foundTaskIndex]["status"]; // flip status
    } else if (parsedDataString["action"] === "delete") {
      console.log("[server] DEL REQ");
      appdata = appdata.filter(
        (item) => item["guid"] !== parsedDataString["task_guid"]
      );
    } else console.error("[server]: Unknown action type");

    console.warn("current appdata:");
    console.warn(appdata);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
