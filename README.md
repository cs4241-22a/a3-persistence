Catbase:
Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

link will go here

Have you ever wanted a database to store and share cat pictures? Well catbase is the solution! Catbase allows users to add, remove and update cat photos posted to a community wall where users can title their photographs and share for the world to see! The hardest parts of this project was getting oauth to work, and rewriting the client side functions to work with mongoDB. Formerly, reodering the items on the database was done client side, but with the addition of mongoDB I had to move this server side, and have the server post a request to "redraw" the table. I also ran into challenges with oauth. Getting pages to redirect during oauth was very challenging. I described my oauth logic below in my technical acheivements. I used Chota to handle css as it has a minimalist UI and great documentation. I wrote some custom CSS to make the table easier to read.

I also used express middleware in this website. Some examples include...
1) app.set() -- for using handlebars
2) app.use() -- handling cookies
3) redirect -- redirecting users during login
4) render -- rendering elements on page
5) app.post() -- posts data but in one line, avoiding the chaos of A2

Acheivements
---

Below are suggested technical and design achievements. You can use these to help boost your grade up to an A and customize the 
assignment to your personal interests, for a maximum twenty additional points and a maximum grade of a 100%. 
These are recommended acheivements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README, 
why it was challenging, and how many points you think the achievement should be worth. 
ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM.

*Technical*

- (10pts) OAuth authentication: I used express to handle the intake of passwords and username, as well as their hashing, and mongoDB to store the data. Express checks for a user on the mongoDB base, and if the user exists, it checks the password. If both cases pass, the user is logged in! This was challenging as I really struggled to get the pages to redirect and reload. I also created a register functionality on a different page to add user data to mongoDB. I used this method because I simply enjoyed working with mongoDB, and find it fun!

- Use of MongoDB: I use mongoDB to handle data storage for both cat data and passwords. This allows for the data to be stored more reliably and has a layer of redundancy in case the server crashes.

Test Account:
u: webware_grader
p: gompei

- (3.5pts) Lighthouse tesitng: I scored highly on the lighthouse testing, while not 100%, I attribute the score decreases on the CSS framework I used, as well as the fact there are many cats on the internet for SEO.

*Design/UX*
-Use of a CSS framework: I used the chota framework. https://jenil.github.io/chota/

- (10 points) Make your site accessible using the [resources and hints available from the W3C](https://www.w3.org/WAI/), Implement/follow twelve tips from their [tips for writing](https://www.w3.org/WAI/tips/writing/), [tips for designing](https://www.w3.org/WAI/tips/designing/), and [tips for development](https://www.w3.org/WAI/tips/developing/). *Note that all twelve must require active work on your part*. 
For example, even though your page will most likely not have a captcha, you don't get this as one of your twelve tips to follow because you're effectively 
getting it "for free" without having to actively change anything about your site. 
Contact the course staff if you have any questions about what qualifies and doesn't qualify in this regard. 
List each tip that you followed and describe what you did to follow it in your site.

- (5 points) Describe how your site uses the CRAP principles in the Non-Designer's Design Book readings. 
Which element received the most emphasis (contrast) on each page? 
How did you use proximity to organize the visual information on your page? 
What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site? 
How did you use alignment to organize information and/or increase contrast for particular elements. 
Write a paragraph of at least 125 words *for each of four principles* (four paragraphs, 500 words in total). 
