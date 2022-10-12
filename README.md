Assignment 3 - Homework Assignment List with Login Functionality
===

<b>Jacob Chlebowski - jachlebowski@wpi.edu</b> <br>
Heroku &rarr; https://a3-jacob-chlebowski.herokuapp.com/  <br>


Welcome to my WebWare Assignment 3. This assignment focuses on the same functionality as Assignment 2, but with a login functionality, and a database that holds all information for a particular user.

![**Login Page**](https://github.com/jacobchlebowski/a3-persistence/blob/main/login.png?raw=true)

The goal of this application is to allow users to create a list of assignments that they might have and the number of days before the assignment is due. For this assignmnet, the ultimate goal was to allow users to only interact with their data from the database (mongodb), and not other data (for different users).

Some challenges I faced upon creation of this application was understanding the functionality of mongodb, and making sure that data can only be accessed by a specific user.


The authentication strategy I chose to use is a create account option and seperate login for the security of users and their respective accounts. For example, upon visiting the home page, the user has the option to log into an existing account or create a new one that will be added to the database.


I used a [Login Page UI](https://speckyboy.com/login-pages-html5-css/) CSS framework veloped by `Khaled Mneimneh`. The only modification to this CSS framework that I made were adding a seperate login creation area below (still using some of the CSS properties from Login Page UI).

The five Express middleware packages that I used include:
1) Serving a static file: `app.use(express.static('./public'))`
2) Parsing incoming requests with urlencoded payloads: `app.use( express.urlencoded({ extended: true}))`
3) Parsing incoming JSON requests into req: `app.use(express.json())`

4) Middleware checking if connection to collection is valid: 

![**Connection**](https://github.com/jacobchlebowski/a3-persistence/blob/main/connection.png?raw=true)


5) Middleware confirm new account creation: 

![**New Account**](https://github.com/jacobchlebowski/a3-persistence/blob/main/new_account.png?raw=true)


**Baseline Requirements That Have Been Met**
1) Created a server using Express
2) Results functionality showing all data associated with a logged user (except passwords)
3) A form/entry functionality that allows users to add,modify, and delete data associated with their account

4) 5 express middleware packages (see for yourself in server.improved.js)
5) Persistent data storage in between server sessions using mongodb
6) Use of a CSS template on my login page (more information above about template used)

7) 100% (EXTRA CREDIT) on the `Performance`, `Best Practices`, `Accessibility` and `SEO` tests using Google Lighthouse



## Technical Achievements
- (5pts)**Tech Achievement 1**: Hosted my site on [Heroku](https://www.heroku.com/). Link is at top of repo if you want to visit. What was better about this was the integration with GitHub so you can enable Automatic Deploys. Every push to `master` will deploy a new version of my app. I didn't find anything worse really. I enjoyed this much more than glitch. 

- (5pts)**Tech Achievement 2**: 100% in all four lighthose tests required for this assignment. 100% on `Performance`, `Best Practices`, `Accessibility` and `SEO`.

![**Lighthouse**](https://github.com/jacobchlebowski/a3-persistence/blob/main/100%25.png?raw=true)



