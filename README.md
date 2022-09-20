Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

## Simple Todo App
Cole Manning

http://a3-rvrx.glitch.me

Simple todo app with GitHub OAuth.


- **challenges you faced**: Tried a custom webserver, got everything debugged and set up... aaaaaand my webhost is block from accessing AWS ;)
- **authentication strategy**: GitHub OAuth.
- **CSS framework**: Bootstrap v5, have experience with it so I used it.
- **five Express middleware packages**:
  1. user defined-middleware :: logs current route
  2. express-static middleware :: serves/gives access to static files
  3. express-json :: parse incoming JSONs
  4. passportjs :: used for GitHub OAuth
  5. express-session :: holds session data (cookies, login status, ...)
  6. favicon :: Serves favicon ico file to the browser

## Technical Achievements
- **Tech Achievement 1 (10 point)**: I used OAuth authentication via the GitHub strategy
- **Tech Achievement 2 (5 point)**: 100% LightHouse score https://i.imgur.com/E8LnOK1.png