Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template

## SurvAye!

Herokuapp: [SurvAye!](https://survaye.herokuapp.com/)

SurvAye is a surveying taking platform proof of concept. It enables users to sign in with GitHub (or with a native account) to the site and submit their response to the survey
Users can only submit one response for a survey and can edit the response in the "Account" page
Admins can manage all response
Admin email: admin@wpi.edu
Password: 1234

### Challenges
This project was a significantly larger challenge than the other assignments. OAuth was difficult to configure as soon as the data left my site it became exponentially more difficult to debug. 
Heroku was the lesser of the evils that I could find for alternative web hosting. Most of the other ones required significant setup and inconvienent file transfering to start. 
Handlebars is a cool software but it lacks a lot of more complex features and native logical operators to enable more complex rendering
Bootstrap has a **steep** learning curve


I used session based authentication with express-session to make it easier to debug and it was frankly easier than some token based strategies. 

I used Bootstraap 5 as the CSS framework due to its robust set of features and overall modern design. I used their online theme creation tool to generate the bootstrap.css sheet. I would like to emphasize **I did not write the bootstrap.css file** I used the Bootstrap 5 online tool to change the color scheme. The rest of the styling remained untouched

### Middleware
1.express-session establishes session cookies for servers to maintain information between requests

2.express-handlebars is a system for server-side rendering of pages.

3.express-crypto is a set of cryptological algorithms to enhance secruity of data. I used it to hash user passwords before sending to DB

4.passport is a middleware used as a platform for authentication strategies to connect a platform to accounts from other sites

5.errorhandler is a middleware used to assist error logging and handling in different environments. Its helpful when the terminal isnt set as the output for console.log

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy
- **Tech Achievemnet 2**: I used Heroku web hosting instead of Glitch
