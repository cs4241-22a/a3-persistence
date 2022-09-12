const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(routes);
app.use(express.static("public"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
