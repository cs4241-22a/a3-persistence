# a3-kateb02
Assignment #3 for Webware 2022


Digital Journal
Heroku link: https://a3-butziger.herokuapp.com/
dummy login:
username = testUser
password = 123

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

the goal of the application:

have a database of entries that you can modify/delete to create an online journal

challenges you faced in realizing the application:
mongoDB - connect string was wrong, using their API in general was weird to  adjust to, I have never taken a database class and I have never worked with 
anything like mongo


what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)
when the user submits login string, it is posted to /login and then checked against my mongo database of users
I picked this because it  seemed  easiest to implement

what CSS framework you used and why
I chose to use miligram because it is minimal and lightweight. I also thought it would be easy to read/accessible because there is high contrast
and I do not have anything going on in the background

include any modifications to the CSS framework you made via custom CSS you authored- none

the five Express middleware packages you used and a short (one sentence) summary of what each one does. 
If you use a custom function for one (and one alone) middleware please add a little more detail about what it does.

(1)body-parser - parse HTTP request body, I wasn't ablt to look at the JSON contents of what I was sending back and forth without this
(2)cookie-session - I needed this for the login, stores cookie on successful login
(3)connection-timeout - when request takes too long to respond, it times out (but none of mine did this when I was developing)
(4)response-time - gives HTTP responses a response time header that describes how long it took a request
(5)serve-favicon - serves a favicon(.ico or image)? and helps display  it  as  an icon at the tab for the webpage

technical achievement - heroku
I developed my project locally with vscode, and then I tried to put it into glitch and it was a nightmare
Heroku was much easier to use, I just had to change the port that I passed in for my express app.
I deployed it straight from github and it worked the first time.
