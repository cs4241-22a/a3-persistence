Catbase:
Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

https://a3-jackleserman-catbase.glitch.me/

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

- (10pts) OAuth authentication: I used express to handle the intake of passwords and username, as well as their hashing, and mongoDB to store the data. Express checks for a user on the mongoDB base, and if the user exists, it checks the password. If both cases pass, the user is logged in! This was challenging as I really struggled to get the pages to redirect and reload. I also created a register functionality on a different page to add user data to mongoDB. I used this method because I simply enjoyed working with mongoDB, and find it fun! Test Account: (username - webware_grader, pass - gompei)

- Use of MongoDB: I use mongoDB to handle data storage for both cat data and passwords. This allows for the data to be stored more reliably and has a layer of redundancy in case the server crashes.

- (3.5pts) Lighthouse tesitng: I scored highly on the lighthouse testing, while not 100%, I attribute the score decreases on the CSS framework I used, as well as the fact there are many cats on the internet for SEO.

*Design/UX*
-Use of a CSS framework: I used the chota framework. https://jenil.github.io/chota/

- (10 points) Make your site accessible using the [resources and hints available from the W3C](https://www.w3.org/WAI/)
1) Provide sufficient contrast between foreground and background
This was part of the reason i picked chota CSS as the contrast was very clear for their built-in styling

2) Ensure that interactive elements are easy to identify
All links are in the forms of buttons and they have contrasting colors to the background.

3) Use headings and spacing to group related content
I used subheadings and headings to group info like titles, subtitles, and instructional information for the page

4) Provide clear instructions
Instructions are listed at the top of the page

5) Use headings to convey meaning and structure

6) Provide informative, unique page titles

7) Create designs for different viewport sizes

8) Write code that adapts to the user’s technology

9) Keep content clear and concise

10) Ensure that all interactive elements are keyboard accessible

11) Avoid CAPTCHA where possible

12) Don’t use color alone to convey information
I used font sizes, bold text, and underline text to convey info


- (5 points) Describe how your site uses the CRAP principles in the Non-Designer's Design Book readings. 

Contrast: I made sure the buttons had the most contrast as they pave the way for the user. The user cannot continue without them. The more important an element was, the more contrast I assigned. I really wanted these elements to stand out. I made titles large and important information like instructions bold. Font also was a player in making sure there was contrast between elements as well as dividers like lines and boxes. For example, I add a line on the main page dividing titles/subtitles and the information on how to use the site. I also made sure the text was easy to read on background colors, on pages, buttons, or tables. 

How did you use proximity to organize the visual information on your page? 
What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site? 
How did you use alignment to organize information and/or increase contrast for particular elements. 
Write a paragraph of at least 125 words *for each of four principles* (four paragraphs, 500 words in total). 
