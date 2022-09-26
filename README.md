Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

## myNotes

Link: http://a3-charlie-roberts.glitch.me

The goal of this application was to develop a simple CRUD note taking app. This webapp demonstrates a simple implementation of CRUD operations with node using express, passport.js, and mongodb.
Some challenges I faced in getting this app working included difficulties learning express and ejs files, working with passport/OAuth, and sending requests from JS (client side) while still using a csrf token.
I chose to use passport with github oauth authentication simply because it seemed easy enough to get working (which it wasn't exactly!) and I wanted to gain experience working with OAuth / SSO.
I used bootstrap as my CSS framework as I like the simplicity and have used it before.
Express middleware packages are as follows:
- logger (morgan) to log messages and debug the application
- cookie parser, which parses and populates the req.cookies object for easy access
- session to maintain state between requests
- passport for oauth authentication
- csrf which is a middleware that prevents CSRF attacks by adding a csrf token and validator to requests
- error handler middleware which catches errors and displays them
- router level middleware to handle incoming requests based on their page

## Technical Achievements
- **Achievement 1**: I used OAuth authentication via the GitHub strategy using passport and mongodb to save users
- **Achievement 2**: Used heroku for remote deployment
- **Achievement 3**: Acheieved 100% on all 4 lighthouse tests

### Design/Evaluation Achievements
- **N/A**