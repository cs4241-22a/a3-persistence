Name Logger with Authentication
Project Link: http://a3-charlie-roberts.glitch.me

For this project, I continued on my name logger. The database no longer stored the index of the entry but continued to store the name, number of characters and timestamp now along with the username and password of the user. Once a user has logged in, only their information will show up on the table. There are now 3 different boxes to use to add, modify, or delete data from the database. 

The biggest challenge I found was the authentication. I spent multiple hours working on a solution because different aspects of the webpage kept breaking. In the end, I used one page for authentication and another to show data that included a sign out button. Once a user has entered their information, login.js sends a POST request to the server with the username and password that was provided. If it authenticates, then a cookie is created that stores the username and password and then the application is redirected to the results page. If they are not authenticated or the user does not exist, then the login screen is reloaded.

For this project, I used Bootstrap 5.2.1. I used this CSS Framework becuase it was the most popular out of the general purpose frameworks. The only CSS modification I used was creating a border around the table that held the results from the database.

The Express Middleware Packages I used were...
1. Session: I used this to keep a users session information stored to only show their information.
2. Timeout: I used this to set a 10 second timeout for requests
3. Serve-Static: I used this to serve all of the html and js files (express.static(...))
4. Body-Parser: To simplify converting JSON files
5. Errorhandler: I used this to throw an error if a username is not on file