

## Player Roster

Glitch link: https://a3-nadiyah-garris.glitch.me/  


Can sign up for an account of your own or use the account I already made:
Username: Nadiyah
Password: Nadiyah


- **Goal**:
The goal of the application is for coaches to be able to make rosters for the players they are adding to the team and update or delete the player information.

- **Challenges**:
I had alot of errors going through this project which were mainly mongodb related and had to ask a lot of questions but eventually Kyle helped me.
This project also made me lose sleep and so stressed to the point that I have been sick for days.

-**Bugs**:
When you try to update a specific player it automatically updates the first/top one in the table no matter who it is.
Also when adding players don't put the same exact name because when you delete it just picks one of them.

-**CSS Framework**:
https://unpkg.com/spectre.css/dist/spectre.min.css 
I used spectre css. I liked the way it looks and how it gave a run-down on how things should look in the code.
I changed some of the button colors to violet, red,blue and teal (my favorites).

-**Express Middlewares**:
body-parser: This middleware parses incoming request bodies before handlers.
cookie-session: sed for log-in implementation and stores the user session.
cookie-parser: creates cookie sessions
express-session: stores user data to associate requests with the logged in user.
login/register/loginfail.html: takes user to main page/registers account and redirects to login page/gives login failed message when account info is wrong
app.use(express.static('public')): Loads static pages

## Technical Achievements
- **Tech Achievement 1**: None

### Design/Evaluation Achievements
- **Design Achievement 1**:
I followed the following tips from the W3C Web Accessibility Initiative...
Writing:
- Provide informative unique page titles: Pages have different titles to distinguish from the other pages. 
- Use headings to convey meaning and structure: Short headings to group related things and describe sections
- Make link text meaningful: Link text on sign in and sign up page decribes the content of the link target
- Provide clear instruction: In all the boxes, users are told what needs to be entered
- Keep content clear and concise: Short, clear sentences and paragraphs

Design:
- Provide sufficient contrast between foreground and background: Buttons, labels/texts and forms all contrast
- Don't use color alone to convey info: Using labels on the buttons
- Ensure that interactive elements are easy to identify: Links on sign up and sign in page are highlighted and buttons change color when hovering over them.
- Ensure that form elements include clearly associated labels: Labels are above their fields
- Provide easy identifiable feedback: When the user doesn't log in correctly it informs them that their username or password is incorrect and to try again.
- Using headings and spacing to group related content: The add player, update player and delete player are all in their own seperate grey boxes

Developing:
- Associate a label with every form control: Every form where the user has to put information has a label
- Identify page language and language changes: The "html lang="en"" is in my html files
- Help users avoid and correct mistakes: Login error when user puts in wrong info

- **Design Achievement 2**:
CRAP principles
Constrast: The forms and the buttons contrast with each other color-wise to let the user know what to press/click when trying to submit information. 
The colors for the buttons are different on the main page to correlate what they are for. Add player is blue, Update player is teal, load roster is violet and 
delete player is red. All the things on the main page are similar because they have to do with the players but they all stand and do different things so I wanted to try and make that clear
with the colors and labels. Also all the pages contrast from each other because they all deal with and do different things like the color and text differences between
the sign up and sign in page.

Repitition: I used grey, black, some form of purples and some form of blues alot across the three pages. All the fonts are the same for the sign in/sign up pages
and all the fonts are the same in the main page. All the buttons on the main page have the same CSS styling except for the color of them. All the labels that
are similar are the same like the Username/password/player name/jersey number/ positon/ class year. All the boxes have placeholders in them to further explain
to the user what goes in the box. Like the example card (in the book "Mermaid Tavern"), the users eyes will always go back to the top when looking at the input forms because that's where the chart appears

Alignment: All the forms on the main page are aligned going from the left to the right. The user can create an invisible line
in their mindsbased on the amount of seperation between each form for player information. All the titles are labeled. When players
are entered the chart information is aligned with the chart label it should be under. The sign in and sign up page forms and button are all aligned together. The labels for
the username and password are aligned as well. The sign in and sign up pages information are also all aligned to the left side of the screen. Everything on the main page
starts at the same place on the left side of the screen. 

Proximity: All related items are grouped together on my sight. On the main page, all the form boxes are with their relative button. All the forms don't need
the same information so all the sections have the forms that are needed for that specific action. The labels for the sections are all the same size and bolded. There's 
also little spaces between the chart info to show that they are seperate things/information but are all apart of the same grouping. The sign in and sign up pages have the 
forms for username and password close together to let the user know they have to fill out both but not close enough to confuse which goes into which box. The button
is not that far from the information and is right below so the user won't have trouble finding it and right below that is to take them to the opposite page if
it relates to them.

