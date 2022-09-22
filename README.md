## Lena Dias's To-Do List (CS 4241 Assignment 3)

https://a3-lenadias.glitch.me/

This is a small to-do list application that can manage and maintain the data of several users
between sessions, allowing for new user registration and login.

- The goal of the application is to function as a basic to-do list for multiple users, maintaining unique data stored via MongoDB for each of them.
- The biggest challenge while realizing this application was to figure out how MongoDB and Express can be connected to the Javascript, such as what API functions I should be using from their many. I also had to do some playing around in the filesystem to get serve-favicon to work.
- To authenticate users, I stored their username and password through MongoDB and verified if the local inputted login info matched the MongoDB info. It's not particularly secure, but it is simple and reasonable scope for the assignment. 
- I used Bootstrap for the CSS framework, as it provided clean, simple styling (and was also commonly used, so I figured it'd be easier to troubleshoot).
  - Additionally, I made some modifications to the table and body background, since Bootstrap's default stylings didn't include the table borders, button reactions, and grouping of elements that I wanted.
- The Express middleware packages I used were:
  - express.json : formats uploaded request strings into json data
  - express.static : serves the pages and information for the website
  - cookie-session : maintains user information 
  - helmet : sets HTTP header information to help secure the app
  - serve-favicon : serves a favicon for display on the webpage tab.

### Technical Achievements
- **Got 100% on all four Lighthouse tests**: I got a 100 on all four Lighthouse tests on both pages of my application, which required some additional implementation of meta and label tags at the end of my project.
