Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
---

Dillon McCarthy<br>
GitHub Username: dmccarthy11<br>
https://a3-dillon-mccarthy.herokuapp.com/

## The Jim

This application allows different users to login and make their own personal workout plans.  A user can add, remove, and edit workouts including the name of the exercise, the number of sets, reps and the weight being lifted.

- Challenges:
  - How to monitor different users in the database
  - An effective way to edit an entry in the database that was simple from a UI perspective
  - How to incorporate the Bootstrap CSS template 
- Authentication strategy: cookies were used to authenticate users and track their own entries into the database.  This method seemed the simplest to implement and did not require much JavaScript
- CSS Framework: Bootstrap was used because this is the most popular.  I had no experience using a CSS framework, so I figured I would go with the most popular and most well known because it would be good to learn and have experience for later projects.
- Expression middlware packages:
  - serve-static: replaces serve.static to serve static files
  - connect-timeout: sets a timeout period for processing an HTTP request
  - cookie-session: incorporates cookie sessions with data stored on the client to track logins
  - response-time: records the response time of an HTTP request
  - compression: compresses HTTP requests

Application Notes:
- Initial access is to the login page.  If the username/password to login is incorrect, or if "I am not a robot" is not checked on creating an account, the user is requested to enter the info again, but no feedback is presented, the page is simply reloaded.  In a future application, this would be an important feature to add
- In the main web page, "Get bigger" adds a workout and "Get smaller" removes a workout
- To remove a workout, the form is case sensitive and is conscious of spaces.  This means if a workout is added with "50 " as the weight then the space will be included in the database and "50 " will be required to remove it; otherwise, "50" will return "exercise not found"
- The "edit" form is indexed at 1, so 1 refers to the first entry in the table (this feedback is given, but just to clear up confusion)
- When adding, removing, or editing an entry, there is a bug, oftentimes once opening the edit menu, where the data is not immediately updated.  This bug may occur sometimes, but the data does have the capability of being refreshed immediately with all actions from the user, multiple tries may just be needed
- For the lighthouse test, when testing in a normal Chrome browser, I recieve a low performance score that says "Chrome extensions negatively affected this page's load performance. Try auditing the page in incognito mode or from a Chrome profile without extensions."  The score is perfect when following this advice

## Technical Achievements
- Web application hosted on Heroku
This hosting service appears to be more advanced and more realistic to host an actual web application.  Glitch seems to be marketed more for the classroom and for learning opportunities, whereas Heroku seems to offer more advanced capabailities such as automatic pipelining from GitHub to Heroku.  With this being said, Heroku was more challenging to use and less user friendly.  The service does not (from what I could tell) offer any text editor to edit files.  Instead, any time a change is made to the application, it must be edited elsewhere, pushed to GitHub, and redeployed on Heroku.  Additionally, I also had an issue when first deploying to Heroku where the application did not start and timed out.  This was very difficult to solve because all I had to view were the logs, but eventually I found out Heroku was unable to bind the server to a port.  Fortunately, other people also had this issue and it was resolved by adding a few lines of code in the beginning of my server.js file as denoted here https://stackoverflow.com/questions/31092538/heroku-node-js-error-r10-boot-timeout-web-process-failed-to-bind-to-port-w

### Design/Evaluation Achievements
- **Design Achievement 1**: Make your site accessible using the [resources and hints available from the W3C]
  - Provide sufficient contrast between foreground and background
    - I actively used dark fonts on a white background for most text.  In the instance that I used white text for the buttons, I used a dark background color for the button to ensure sufficient contrast for viewers to see clearly
  - Don’t use color alone to convey information
    - When trying to enter, remove, or edit data, if the action was unable to be completed, such as not all boxes being filled out, rather than highlighting the box in red, the red is used to show an error, but alongside a text description that prompts the user with feedback.  This ensures the user's ability to use the site does not depend on their ability to see color
  - Ensure that interactive elements are easy to identify
    - Interactive elements are easily identifiable by changing the mouse accordingly.  Over a text box the mouse changes to the text mouse, and over a button it changes to a hand to click the button
    - Interactive elements themselves also change when hovering over them.  The button will change to a slightly darker color to show it can be pressed
  - Ensure that form elements include clearly associated labels
    - All form elements have placeholders inside of the form rather than labels to ensure there is no confusion and it is clear and easy for the user to use
  - Use headings to convey meaning and structure
    - A heading structure is used so that the larger headings are at the top of the page and create sections, where the larger text represents more important information
  - Help users avoid and correct mistakes
    - Different feedback is given for different actions
      - Incomplete form --> Fill out missing values
      - Wrong edit table number --> Enter number 1 through x
      - Remove something not in data --> Unable to remove because not in workout plan
  - Write code that adapts to the user’s technology
    - The viewport changes sizes accordingly and the tables and forms adjust based on the width of the user's device
  - Ensure that all interactive elements are keyboard accessible
    - Buttons can be pressed by tabbing over and using the enter keystroke
  - CAPTCHA
    - The CAPTCHA is easy and simple to use and does not require any visual information other than checking the box when creating an account
  - Users have enough time to read and use the content
    - The time-sensitive information on the page is the error feedback to the user.  This error message does not disappear, however, and instead remains on the page for the user to finish reading.  Once the user interacts with the web page again and requests another action, then the message will disappear
  - Users can easily navigate, find content, and determine where they are
    - Simple two-page application design with login and main page
    - Very simple controls, where a user is presented to login or create an account and that is it
    - Logout button in the top left in a location standard to most websites
  - Content appears and operates in predictable ways
    - Navigation and interactive elements in the application are repeated across pages and consistent
    - Significant changes on a web page do not happen without the consent of the user
    - User interface components that are repeated on web pages have the same labels each time
- **Design Achievement 2**: Describe how your site uses the CRAP principles in the Non-Designer's Design Book readings.
  - Proximity:
    This technique was used in the webpage to group alike objects together.  In my application, there are multiple interactive elements.  All of the forms and buttons related to the workout routine are all in close proximity to each other.  This suggests that they are related and manipulate the same data, which they do.  On the other hand, the logout button is in the top left corner of the page, not in close proximity to these other buttons.  This indicates that this button is separate, and indeed it is because it does not manipulate the data and does not require any input from the user other than clicking the button itself.  The same is true for the login page.  The username and password for the login form are adjacent to each other, but there is significant space between this and the create an account form.  This is because they are separate actions yet both allow the user to login.
  - Alignment:
    Everything on the web application is aligned with purpose.  All of the text in the table for the workout plan is left-justified in its own respective column. This makes it clear which and which entry belongs to which column since there are no column lines (for asthetic purposes this looks much nicer). The rest of the text on the page is also left-aligned making it easier to read for the user.  Additionally, all of the forms in this application are aligned vertically, and all individual entries within a form are aligned horizontally.  The table at the bottom and heading at the top with the inspirational message are also aligned in their widths.  This creates a visually appealing header and footer for the application and lets the user know that there is some relationship between these.
  - Repetition:
    This technique is used within the application to convey important information.  For example, the same placeholders are used for the add and remove forms for the database.  This ensures there is consistency and lets the user know that in order to remove an exercise, you need to use the same exact information you used to add the exercise to your workout routine.  Additionally, there is repitition in the color of the buttons to convey like actions.  The add, remove, and logout buttons are blue because they are all a final action.  On the other hand, the edit button is grey because this is not the final action.  When this is pressed, another form pops up with an "update" button in blue.  Then, when this button is pressed the data is updated.  In this way, only when a blue button is pressed is something changing on the server.
  - Contrast
    This technique is used to make the page more engaging and visually appealing to the user.  The most contrast presented on the page is with the header being backed by grey as opposed to the remaining white page.  This highlights the top message and emphasizes its importance.  After all, "Outwork thousands in front of nobody to outshine everybody in front of thousands" is very important advice.  Additionally, there is contrast with the buttons being blue which makes them stick out to the user and more identifiable that these are interactable and will bring the user's attention to using them.  Finally, within the table, when an exercise is hovered over, the table row is highlighted with a darker shade of grey which indicates that is is currently being looked at.
