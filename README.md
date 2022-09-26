Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

## Favoritizer

Gabriel M. Buonomano
http://a3-gabriel-buonomano.glitch.me/login.html
Alternative Server: 75.136.89.25:3000/login.html

IMPORTANT: For some reason, I cannot get the starting page to be /login.html. Please visit /login.html directly after starting the server; going directly to index.html (or no page) breaks the server's expected authentication flow and messes with it. I'd fix it if I had time.

This project aims to create an updateable list of favorites for the user. They can categorize favorites under categories.
The intent is to allow eg. listing your favorite pizza, pasta, and ice cream flavor all under a "Food" category.
The most significant challenge I faced was time pressure.
I chose to implement password-based authentication that then uses tokens to keep a session. It seemed like a good combination of easy and secure.
I used Bootstrap because I have experience using it and the class-based design is very unintrusive.
I only had to make minor width adjustments and CSS resets outside of Bootstrap. Everything else is all using it.
Middleware:
 - Morgan: Logs requests with timings to gauge server performance and see when requests are made
 - Custom middleware: Logs some details that I found useful myself. Also marks important Morgan logs before they happen with a newline. Specifically, this logs the user's token, their requested URL, and their method of requesting it.
 - express.static: Serves files in the public directory without needing a path for every individual file
 - bodyParser: Allows you to access form data in the request object
 - serve-favicon: Disabled because it kept causing issues with serving unrelated files, but should serve the favicon of my site.

## Technical Achievements
- **Full lighthouse score**: I got all 100s on my lighthouse score. Proof has been provided in 100-percent-proof.png. PWA/mobile not included.
- **Alternative hosting**: I'm currently hosting the website on my personal server. This avoids glitch-specific issues like image links being broken or the server having to start up, but it adds the overhead of needing to keep a spare laptop running constantly (and updating the IP whenever it changes). If the server's currently off, please tell me, I can turn it back on easily.

### Design/Evaluation Achievements
- **None**: :/
