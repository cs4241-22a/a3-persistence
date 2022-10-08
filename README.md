Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template

## Notify

https://a3-dinmukhamed-umbetzhan.herokuapp.com/auth/login

For this project I used heroku to achieve 5 points.

The goal of Notify is to add/delete and edit notes that was created by user. Any user can log in using github account, their nickname will be stored in the DB of the application. Each session is also stored in the DB of the application. After logging in user can use functionality mentioned above.

Biggest challenge while creating this application was storing the session of each user in the DB, since the documentation of the middleware is out of date and I had to find out the resolution on the web.

For this project I have chosen authorization via github to achieve points and face the hardest challenge. And to be honest it was easy to implement since I have done it earlier.

Middleware packages I used:
- CORS middleware - Cross-Origin Resource Sharing. Done to bypass the access-control-allow-origin headers
- cookie-parser - used it to store cookies on the web application
- ejs - used as a view engine
- mongoose - used to connect to MongoDB
- dotenv - used to create environment variables 


## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy
- **Tech Achievement 2**: Instead of Glitch I used Heroku

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative:

- Provide clear and consistent navigation options: Navigation on my web application is straightforward: login -> user page (where you can logout) and if you logout -> login page.
- Content is clear and concise - Login page has only button: Login via github, user page has only functionality that I wrote above: create/delete/edit and logout.
- Ensure that form elements include clearly associated labels - I have only one form and it has only one entry which is content that is supposed to be in the note (and it has label on it)
- Identifiable Feedback for User - in case of any error on my web application the message with error will pop-up, and say how to handle the error. And in case if note is empty and user will try to add it, the message will also pop-up.
- Provide clear and consistent navigation options - as stated above, navigation includes only two pages which are: login and user page which is pretty straightforward
- Use headings and spacing to group related content - navigation bar has the heading as well as the table of notes.
- Provide informative, unique page titles - Each page title has unique name.
- Help users avoid and correct mistakes - I have error messages that will pop-up in case of any errors.
