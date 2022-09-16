const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../.env" });
const routes = require("./routes");

const app = express();
const port = 3000;

// Connect to database
(async () => {
  mongoose.connection.on("open", () =>
    console.log("Connected to MongoDB instance")
  );
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}/?retryWrites=true&w=majority`
  );
})();

// Middleware
app.use(routes);
app.use(express.static(__dirname + "/public"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
