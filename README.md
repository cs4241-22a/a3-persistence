Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===
## Marathon Rock Paper Scissors

http://a3-sean-oconnor.glitch.me

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
- **100% in All Four Lighthouse Tests**: 

### Design/Evaluation Achievements
- **Twelve Tips Implemented from the W3C**: Tips implemented into the site include:
1. _Using for and id attributes_: The for and id attributes were used for each label used. These include the "Name", "Password", "Login", and "Register" forms in index.html, and the "Rock", "Paper", "Scissors", "Submit", "Change", and "Delete" forms in main.html.
2. _Provide sufficient contrast between foreground and background_: The colors of the site were chosen to make the site as accessible as possible, which included the use of contrast between the foreground and background. In particular, the background is gray, while the text the user will read is white and buttons are blue and green. These colors allow for users to properly read and identify foreground objects from the background.
3. _Ensure that form elements include clearly associated labels_: All form elements include clearly associated labels. On the landing page, labels are present within the field for users to type in. Buttons and radio buttons are also given labels for proper context.
4. _Use headings to convey meaning and structure_: Headings are used throughout the main webpage to separate content into relevant sections. Specifically, headers are given to the main game options, the favorite choice modification selections, and the table of user scores. The headings help provide structure through this separation.
5. _Don’t use color alone to convey information_: More context is given to information that utilizes color. Specifically, buttons are given specific colors based on the type of action. Green buttons relate to data on the server, while blue buttons correspond to game actions. However, text is still provided to give further context to the specific actions.
6. _Keep content clear and concise_: The content is made to be clear and concise. Any instructions or sentences were made to explain relevant information clearly and quickly, and user inputs are labeled with only the action being provided.
7. _Use headings and spacing to group related content_: Through headings and spacing, related content is properly grouped. The headings are used in main.html to separate main game options, the favorite choice modification selections, and the table of user scores. Spacing is provided through margins to further separate the groups. 
8. _Provide informative, unique page titles_: Each page has a unique title that informs the user what the page is about. The landing page, index.html, provides the page title showing that the site is an assignment for CS4241. The main game page, main.html, has the page title "Marathon Rock Paper Scissors" as it is the page where users can play the game.
9. _Include alternative text for images_: For the one image present on the website, that being the logo in index.html, alternative text is provided. The text is included within the img tag, stating "Marathon Rock Paper Scissors Logo".
10. _Provide clear instructions_: User activities within the site are given instructions. Instructions are provided to explain how to play the game of Rock Paper Scissors and submit the score, as well as how to edit the favorite choice for a given score.
11. _Identify page language and language changes_: The primary language is set to English for both index.html and main.html. This was done by including lang="en" in each html tag.
12. _Avoid CAPTCHA where possible_: The site requires no CAPTCHA to verify a user. Instead, the site checks if the user logging in is valid by checking if the inputted username and password exist within the database and are together. Otherwise, the user cannot log in.
- **Usage of the CRAP Principles**:
