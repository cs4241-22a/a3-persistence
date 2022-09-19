const express = require("express"),
  app = express();

const logger = (req, res, next) => {
  console.log("url:", req.url);
  next();
};

const router = require("./app/app.routes");

app.use(logger);
app.use("/", router);
app.use(express.static("app/css"));
app.use(express.static("app/img"));

app.listen(process.env.PORT || 3000);
