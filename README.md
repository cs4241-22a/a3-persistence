Cole Ouellette
https://a3-cole-ouellette.glitch.me/

## Assignment Tracker v02

This project was designed with WPI students in mind. It is a one-stop shop where a user can go online and keep track of every course and assignment that they have underway at any given time. As it is a single-page application, the only page is index.html and it does indeed validate. The application is comprised of two HTML forms, two table elements to display the appropriate information, and a title header. The entire application is styled with the Oswald Google Font family and uses Element, ID, and Class selectors to style individual elements which can all be found in the _style.css_ document . To help structure the webpage, the forms are contained within flexboxes to maintain a more user-friendly experience on a variety of device sizes.

The biggest difficulty that I ran into while doing this assignment was figuring out how to link information from the database to the HTML table and form elements. The way I have the MongoDB set up, the collection consists of Users. Each User has a Name, a Password, an array of Courses, and an array of Assignments. To get the specific course and assignment information into the tables, I used the EJS middleware and rendered the main page with a JSON object containing the specific data that I want to display and then the client recieves the data and places it into the appropriate tables.

For authentication, I chose to write a custom method to check if the entered username exists in the database. If it does, it then checks to see if see if the password matches and logs in, loading the data for the user. If the password is incorrect, a "Wrong password" message is shown and the login is rejected. If the username is not found in the database, a new user is instantiated, the password is hashed, salted, and stored in the database, a message comes on screen alerting the user, and they are prompted to log into the new account. I tried for a long time to get passport working but ultimately went with this strategy instead because it made more sense to me.

I styled the page using the PureCSS framework. After looking over a few different frameworks, I really liked how PureCSS complemented my existing layout so I adopted it. In order to make Google Lighthouse 100% around the board, I had to write a little custom CSS to increase the contrast between the 'submit' buttons and the text on top and also restyle the error message (that was just for special touches).

My six Express middleware packages were:
  - Session: Allowing a user to stay logged in across the webpage
  - Mongoose: Saving data in a persistent database
  - Helmet: Securing the HTTP headers that Node.JS doesn't do automatically
  - Bcrypt: Hashing, salting, and decrypting the user's passwords within the database
  - EJS: Generating HTML markup directly with JavaScript. Used primarily to populate the table elements with data from MongoDB
  - Custom middleware for processing the User schema to and from MongoDB 

## Technical Achievements
- **Tech Achievement 1**: I achieved 100% in all four lighthouse tests required and made sure to test on all pages.

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative:
  1. Associate a label with every form control - Each input has a corresponding label 
  2. Identify page language and language changes - Each page is clearly marked to by in English within the HTML tag
  3. Use mark-up to convey meaning and structure - To semantically structure the website, I used the *aside* element to signify the tables are separate from the main content
  4. Help users avoid and correct mistakes - The date element makes sure that every date selected is in the proper format because a text input would create too many deviations
  5. Reflect the reading order in the code order - The markup is written in the exact way it should display on the screen
  6. Provide informative, unique page titles - The website is split into Home and Login pages
  7. Provide clear instructions - Password field is clear in what a secure input should look like
  8. Provide sufficient contrast between foreground and background - Google Lighthouse approves that the contrast I employ is significant between foreground and background elements
  9. Ensure that form elements include clearly associated labels - All form elements have clear labels to show how they should be used
  10. Provide easily identifiable feedback - The required fields allow the browser to point out when/if something is missing
  11. Provide clear and consistent navigation options - Both pages follow the same familiar layout
  12. Use headings to convey meaning and structure - On the main page, the forms each use a legend to organize the content
