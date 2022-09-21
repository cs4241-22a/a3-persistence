Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

Due: September 22nd, by 11:59 AM.

This assignnment continues where we left off, extending it to use the most popular Node.js server framework (express), 
a database (mongodb), and a CSS application framework / template of your choice (Boostrap, Material Design, Semantic UI, Pure etc.)

## Activity Logger

https://a3-nicholas-li.herokuapp.com/ on Heroku

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- Your very own event logger. This is meant to be the opposite of a calendar. Instead of schedule what you WANT to do, you would log in events that have already been done so you have an idea of what you have done throughout the day. Be sure to log all the events that you have done!
- The main challenge in creating this is learning these new technologies and applying them correctly
- The authentication strategy that I chose to use is just a system of using a username and password, logging in and signing up.
- CSS framework: Pico CSS (https://picocss.com/)
    - I chose this because it seemed to me as a very minimalistic design and I did not want a very complex design that would lead people away from the point of this website
    - I used some custom CSS to change the alignment and sizing of the components since the frameworked seemed to put everything at 100% of the screen size. I also added a header. I changed the color of the button to add contrast as per the suggestion of lighthouse.
- Express middlewares
  - "express.static()" to deliver the files in the public and views folders
  - "express.json()" to handle getting and sending the JSON
  - "cookie-session" to handle getting the current user logged in
  - "express.urlencoded" to get the data that sent from the server to the client and back
  - "express.timeout" to timeout any http process that takes over 10 seconds to complete

Baseline Requirements
---
 I created a server using Express <br>
 I am using a table that shows the results that belong to the user logged in <br>
 I am using a form that allows the user to submit a form that adds to the results, delete and edit an entry. <br>
 I am using several forms of Express middlewares:
<ul>
<li>"express.static()" to deliver the files in the public and views folders</li>
<li>"express.json()" to handle getting and sending the JSON</li>
<li>"cookie-session" to handle getting the current user logged in</li>
<li>"express.urlencoded" to get the data that sent from the server to the client and back</li>
<li>"express.timeout" to timeout any http process that takes over 10 seconds to complete</li>
</ul>

I am keeping persistent data storage in between server sessions using Mongodb.
I am using a CSS framework (Pico CSS) to do the majority of the styling with some of my custom adjustment to sizing and other smaller things.

HTML:<br>
I am using various types of input and form tags (select, input(text), date, time, textarea) <br>
I am showing the results of the logged in user on the results table. <br>
I am using 3 separates pages for this website. I have a log in page, a sign up page for those without an account, and a main page that handles the form input and the results. <br>


CSS: <br>
I am using a CSS framework (Pico CSS) to do the majority of the styling with some of my custom adjustment to sizing and other smaller things.
I use a custom stylesheet to change the colors of some buttons, centering everything on the pages, and changing some alignment of the text and labels.


JavaScript: <br>
I used some Javascript to get and fetch the data from the server and rebuild the table for the results.
Starting the website, I am fetching for all the data that belongs to that user and builds the table with the existing data


Node.js: <br>
A server using Express, at least five pieces of Express middleware, and a persistent database (mongodb).


## Technical Achievements
- **Tech Achievement 1**: I am hosting my site on a different service Heroku https://a3-nicholas-li.herokuapp.com/. I like Heroku more than Glitch in the sense that I feel it is faster. The site does not need an initial load at the beginning and it was also easy to use. I also like that it has an auto deploy function that automatically grabs from the main branch and updates. I was also easy to setup since I only needed to connect to github and it allows to connect to the repo. I have not found anything that I like Glitch more than Heroku at the moment.
- **Tech Achievement 2**: I got 100% on all four lighthouse tests for this assignment for all three pages of my website. I have included them in the photo folder.
- 

### Design/Evaluation Achievements
- **Design Achievement 1**: CRAP Principles
- Contrast - My website is using contrast on each page. The main elements of contrast are in the colors on the site. For the background color, I am using a sort of dark navy blue color from the Pico CSS framework. On the other hand, the foreground colors of the texts are white. This creates a high contrast between a dark background and a bright text/foreground. There is also some contrast between the colors of the buttons. For the button, I changed the button to a pink/tan color resting on the same dark blue color. I also made the text inside the button the same color as the background to show more emphasis and contrast. So there is contrast between the background of the site and the color of the button but also the color of the button and the text of the button. 
- Repetition - I am using several forms of repetition for this website. I make sure that all pages use the same colors. I am using the same dark blue color from Pico CSS for the background on all three pages. I am using the color grayish white for text for all pages. except for the text inside the buttons which are all the dark blue color. I am using the same format for all pages using the same size fonts. I am using the same font for all pages, the fonts size for the headers are the same etc. All the pages also show the same minimalist design with very few colors and no images. I am also repeating the same form inputs, for example, the sign up page and the log in page are the exact same form format.
- Alignment - I am making sure that the alignment on my site has connections for all three pages. All the elements on my site, I am aligning them to be centered. For example, all the form inputs are centered. There is a label above every input that describes what you are entering for the form. Centering the forms and table, I am also making the left and right margins equal so that they are not taking the entire width of the screen and also centered. I am aligning the label to be left aligned and starting at the start of the left side of the form input. All the headers are also aligned centered. For the header on the site, it shows the logged in user and it is right aligned.
- Proximity - For the proximity of the website, I am keeping the forms close. The labels and form inputs are all close together so that they appear to be a unit and not to be confused as separate entities. I put the label right above each form input so that users would know what each input is referring to. I am keeping others separate. For example, the header would have some space between that and the heading and then that would have some space before reaching the form. The form would also have some distance between that and the table. For the signup and login pages, the only things there are for the users to input their username and password so they are all together to seem like a unit. The button would always be at the bottom so that users know that everything above is meant to be all inputted and then submitted



