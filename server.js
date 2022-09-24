if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const cookie = require("cookie-session");
const favicon = require("serve-favicon");
const path = require("path");
const nAuthedRouter = require("./routers/Nauthed");
const AuthedRouter = require("./routers/authed");

//Middleware function to route requests based on session login status
function routeDecider(req, res, next) {
	if (req.session.login === true) {
		app.use(AuthedRouter);
		console.log(`${req.url}: routed using authed router`);
		next();
	} else {
		app.use(nAuthedRouter);
		console.log(`${req.url}: routed using non-authed router`);
		next();
	}
}

app.set("view-engine", "ejs");
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	cookie({
		secret: process.env.SESSION_SECRET,
		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	})
);
app.use(routeDecider);

app.listen(3000);
