const express = require("express"),
  app = express();

const logger = (req, res, next) => {
  console.log("url:", req.url);
  next();
};

const router = require("./app/app.routes");

app.use(logger);
app.use("/", router);

app.use(express.static("app"));
app.use(express.json());

const uri = app.listen(process.env.PORT || 3000);
