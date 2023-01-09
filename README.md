Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===


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

- the goal of the application
- challenges you faced in realizing the application

I had the beginnings of a login system as part of my authentication strategy, but struggled to get it working. 


## CSS Framework
I used Bootstrap as my CSS framework of choice. I liked the simplicity and sleakness of Bootstrap. When I was looking into different frameworks, I read that Bootstrap's grid system was one of the most flexible and response. I ended up ultilizing this in my two column approach to the webpage. The majority of my edits via CSS was color changes or playing around with the spacing (which was a struggle).

## Express Middleware

I used the following Express Middleware packages:
- 1. ejs, which passes data from the database to the browser to display content.
- 2. body-parser, which parses JSON data.
- 3. response-time, which records the time it takes for a server to respond to an HTTP request.
- 4. connect-timeout, which allows you to set a specific amount of time it should take a server to load before timing out.
- 5. cookie-session, which stores a user's cookies for the current session.

## Technical Achievements
- **I deployed the app on Digital Ocean**: I preferred this method to using Glitch because Digital Ocean deployed my application straight from GitHub. Had I used Glitch, I would have had to import my files. The downside to Digital Ocean and other services like Heroku is that (1) they require a credit card to get started and (2) they're going to cost you once your free trial is up. In that sense, Glitch is a more budget/student-friendly option of deployment. Both Digital Ocean and Glitch can auto-update the deployment when changes are made.  

## Design/Evaluation Achievements
- **I followed the following tips from the W3C Web Accessibility Initiative**: 
1. Provide sufficient contrast between foreground and background. I run the foreground and background colors through the Adobe Color Contrast Checker and it passes WCAG AAA level standards.
2. Provide informative, unique page titles. Each of my pages had a different, descriptive title. 
3. Help users avoid and correct mistakes. I include placeholder text in all my form input boxes. This helps users better understand what input is being requested and the format.
4. Include alternative text for images. I used empty alternative text for the decorative icons on my page. 
5. Provide clear instructions. I provide concise instructions for users to add and edit a book entry. 
6. Keep content clear and concise. I wrote short but clear sentences for the instructions.
7. Ensure that all interactive elements are keyboard accessible. All my form components can be accessed via keyboard. 
8. Associate a label with every form control. All my form components have a label. 
9. Write code that adapts to the user’s technology. I avoid horizonal scrolling and the app will adapt to different sizes.
10. Ensure that interactive elements are easy to identify. Buttons and input fields are easy to identify by eye.
11. Ensure that form elements include clearly associated labels. All of my form elements have labels.
12. Use headings and spacing to group related content. The different forms have headings and spacing that indicate what goes into each form. 
