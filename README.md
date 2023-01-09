Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

Due: September 22nd, by 11:59 AM.

This assignnment continues where we left off, extending it to use the most popular Node.js server framework (express), 
a database (mongodb), and a CSS application framework / template of your choice (Boostrap, Material Design, Semantic UI, Pure etc.)

Baseline Requirements
---

Your application is required to implement the following functionalities:

- a `Server`, created using Express (no alternatives will be accepted for this assignment)
- a `Results` functionality which shows all data associated with a logged in user (except passwords)
- a `Form/Entry` functionality which allows users to add, modify, and delete data items (must be all three!) associated with their user name / account.
- Use of at least five [Express middleware packages](https://expressjs.com/en/resources/middleware.html). Explore! One of these five middleware 
can be a custom function that you write yourself; if you choose to do this, make sure to describe what this function is in your README.  
- Persistent data storage in between server sessions using [mongodb](https://www.mongodb.com/cloud/atlas)
- Use of a [CSS framework or template](https://github.com/troxler/awesome-css-frameworks). 
This should do the bulk of your styling/CSS for you and be appropriate to your application. 
For example, don't use [NES.css](https://nostalgic-css.github.io/NES.css/) (which is awesome!) unless you're creating a game or some type of retro 80s site.

Your application is required to demonstrate the use of the following concepts:  

HTML:  
- HTML input tags and form fields of various flavors (`<textarea>`, `<input>`, checkboxes, radio buttons etc.)
- HTML that can display all data *for a particular authenticated user*. Note that this is different from the last assignnment, which required the display of all data in memory on the server.

Note that it might make sense to have two pages for this assignment, one that handles login / authentication, and one that contains the rest of your application.
For example, when visiting the home page for the assignment, users could be presented with a login form. After submitting the login form, if the login is 
successful, they are taken to the main application. If they fail, they are sent back to the login to try again. For this assignment, it is acceptable to simply create 
new user accounts upon login if none exist, however, you must alert your users to this fact.  

CSS:  
- CSS styling should primarily be provided by your chosen template/framework. 
Oftentimes a great deal of care has been put into designing CSS templates; 
don't override their stylesheets unless you are extremely confident in your graphic design capabilities. 
The idea is to use CSS templates that give you a professional looking design aesthetic without requiring you to be a graphic designer yourself.

JavaScript:  
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server. 
See the [previous assignment](https://github.com/cs4241-19a/a2-shortstack) for reference.

Node.js:  
- A server using Express, at least five pieces of Express middleware, and a persistent database (mongodb).

General:  
- Your site should achieve at least 90% on the `Performance`, `Best Practices`, `Accessibility`, and `SEO` tests 
using Google [Lighthouse](https://developers.google.com/web/tools/lighthouse) (don't worry about the PWA test, and don't worry about scores for mobile devices).
Test early and often so that fixing problems doesn't lead to suffering at the end of the assignment. 



*Technical*
 

- (5 points) Get 100% (not 98%, not 99%, but 100%) in all four lighthouse tests required for this assignment.  

*Design/UX*
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

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

# BOOKish NOOK
## (but now connected to MongoDB)

https://coral-app-gxbph.ondigitalocean.app/

I implemented my application from A2, BOOKish NOOK. Once again, users can log their reading but this time the data will persist between sessions. 

I had the beginnings of a login system as part of my authentication strategy, but struggled to get it working. 

- the goal of the application
- challenges you faced in realizing the application
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)

- what CSS framework you used and why
  - include any modifications to the CSS framework you made via custom CSS you authored

## CSS Framework
I used Bootstrap as my CSS framework of choice. 

## Express Middleware

I used the following Express Middleware packages:
- 1. ejs, which passes data from the database to the browser to display content.
- 2. body-parser, which parses JSON data.
- 3. response-time, which records the time it takes for a server to respond to an HTTP request.
- 4. connect-timeout, which allows you to set a specific amount of time it should take a server to load before timing out.
- 5. 

## Technical Achievements
- **1. Deployed App on Digital Ocean**: I deployed the site on Digital Ocean. I preferred this method to using Glitch because Digital Ocean deployed my application straight from GitHub. Had I used Glitch, I would have had to import my files. The downside to Digital Ocean and other services like Heroku is that (1) they require a credit card to get started and (2) they're going to cost you once your free trial is up. In that sense, Glitch is a more budget/student-friendly option of deployment. Both Digital Ocean and Glitch can auto-update the deployment when changes are made. 

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
