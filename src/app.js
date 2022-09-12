const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes");

const app = express();
const port = 3000;

// Connect to database
(async () => {
  mongoose.connection.on("open", () =>
    console.log("Connected to MongoDB instance")
  );
  const connection = await mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cs4241-a3.e1sejut.mongodb.net/?retryWrites=true&w=majority`
  );
})();

// Middleware
app.use(routes);
app.use(express.static("public"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
