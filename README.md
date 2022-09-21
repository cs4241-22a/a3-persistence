Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===
## Marathon Rock Paper Scissors

http://a3-sean-oconnor.glitch.me

- the goal of the application
- challenges you faced in realizing the application
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)
- what CSS framework you used and why
  - include any modifications to the CSS framework you made via custom CSS you authored
- the five Express middleware packages you used and a short (one sentence) summary of what each one does. If you use a custom function for *one* (and one alone) middleware please 
add a little more detail about what it does.

This project is a web application that allows users to play Rock Paper Scissors. Users play against the computer to get the highest score possible by winning until the computer eventually wins. Users are then able to submit a score to the server data, as well as delete scores from the shown data. Users can also modify each entry of data by choosing their favorite choice between "Rock", "Paper", and "Scissors". Users can replay the game and submit a fresh score by refreshing the page.

Users will first encounter a login page. You must enter a "Name" and "Password" into the form (text type) fields, then either use "Login" or "Register" inputs (button types). If the password for the name is incorrect, or the user already exists, the login page will restart.

Try making your own name, but if you want to log into a name with multiple scores already exisiting on the database, try:
_Name: a
Password: s_

To play, open the webpage and select an option: Rock, Paper, or Scissors. The page will update based on your choice, changing the score, showing your choice, the computer's choice, and if you won, tied, or lost. If you won or tied, you can continue until you lose. Once a player loses, they can submit the score to the database, which is shown to the right of the page. A user can also delete a score from the database by pressing the "Delete" button, or change their listed favorite choice for an action for a score by pressing the "Change" button. The button changes the field to whichever option is checked in the radio buttons to the left of the page.

The authentication strategy used was to check whether or not the name being used already existed based on if they logged in or registered. For the former, the database was checked to see if at least one entry had the exact combination of the entered name and password. If true, the cookie would be set with the name, password, and session login being true. If false, the session login would remain false and the page would be sent again. A similar process occurs for registering a name, except only the name is checked to see if it already exists. If it has not, the new name and password is added to the database.

The CSS framework used was Bootstrap 5.2.1. Bootstrap was chosen for its ease of use and did not require an external style sheet to go with it. Bootstrap helped to set the placement of items within the webpage and implement changes to colors for the body, header, footer, and text. 

The Express middleware packages used included compression, cookie-session, helmet, morgan, and custom middleware for the collection. Compression was used as it compresses response bodies for any requests, which could help lower the size of responses. Cookie-session was used to help create the cookie that is used in the login functionality. Helmet was used as it helps set different HTTP headers for security. Morgan was used for being able to send more detailed information to the console from the server. The custom middleware was made and used to check if there is an existing collection, otherwise it sends an error message. It does this by checking if the collection is null, and if it is it sends the error but if it is not the next middleware is used.

Challenges encountered during the project revolved heavily around utilizing Express and properly implementing MongoDB into the work carried over from Assignment 2. There was a learning curve for understanding Express and how middleware worked, and it took time to properly structure and use the different POST and GET requests. Implementing MongoDB combined with these issues in learning Express, and often it was difficult to get data to properly show up onto the page to be added, modified, or deleted.

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
