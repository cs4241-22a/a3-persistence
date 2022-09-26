const express = require('express'),
    app = express(),
    GitHubStrategy = require('passport-github2').Strategy,
    passport = require('passport'),
    serveStatic = require('serve-static'),
    bodyparser = require('body-parser'),
    cookieSession = require("cookie-session"),
    cookieParser = require("cookie-parser"),
    mongoose = require('mongoose');

