TDEE Calculator
===
## by Enoch Zhao

Website link: https://tdeecalculator.herokuapp.com/

There is an existing test account should you not wish to create a new account. The username and password are:

Username: cs4241

Password: 123123

*These details are also provided on the site within the login forms.

- This website continues from the submission in A2, where a user's Total Daily Energy Expenditure is calculated based on provided information
- TDEE results are stored on MongoDB and data shown is only related to logged-in user 
- OAuth Implementation was very difficult to accomplish, a lot of external documentation and guidance from course staff and colleagues was utilised to achieve the end result.
- Github authentication was used due to the straightforward nature of their API, however the need for a callback URL had me stuck for quite a while as I did not know what the url should be since the server had not yet been uploaded to Heroku
- CSS Framework used was Bootstrap 5.2
  - Made additional css modifications for different portions of the site background (Header, Footer, Login and User page backgrounds)
- Express Middleware Packages used:
  - **Passport** - Passport used to authenticate 3rd party login
  - **Serve Static** - For use in serving static files
  - **Body Parser** - For use in parsing HTTP request bodies
  - **Cookie Session** - For use in establishing cookie-based sessions
  - **Cookie Parser** - For use in parsing cookie header and to populate cookie requests
  - **Mongoose** - Mongoose used to provide handler for MongoDB

## Technical Achievements
- **Implement OAuth Authentication (10pt)**: I used OAuth authentication via the GitHub strategy
- **Hosted Website on External Service (5pt)**: I hosted my website using Heroku (as can be seen from the URL)
- **Lighthouse Test Achievement**: I achieved 100% on Performance, Accessibility, Best Practices, an SEO Lighthouse tests (screenshot below)

![alt text](https://github.com/pepenoq/a3-persistence/blob/main/public/images/lighthousetestsa3.JPG)

### Design/Evaluation Achievements
- **Site accessibility through W3C Hints (some points?)**: 
I only exactly followed I think 10 of the hints from the W3C tips for writing, designing, and development. If I needed to follow at least 12 to achieve any points at all, then please disregard this achievement.

Tips followed are below:
- Content is clear and concise - Login Page shows the user exactly where each function is, and User page is not cluttered with the constant inclusion of add forms or edit forms
- Identifiable Feedback for User - Both Login and User pages show error messages clearly detailing the error the user is experiencing for a more smooth experience
- Ensure that form elements include clearly associated labels - Login and User HTML code includes labels for all user forms
- Ensure that interactive elements are easy to identify - All elements on the website that are interact-able have been made clear in the form of buttons
- Use headings and spacing to group related content - Login page groups related content such as account creation or account login to their respective locations on the page. User page also clearly shows the add response or sign out buttons to user
- Provide clear and consistent navigation options - Clear and consistent navigation options for users to log in, create accounts, use Github to login, add forms, sign out, edit forms, and delete forms
- Provide sufficient contrast between foreground and background - Background and foreground colours are different so as to help the user focus on matters of importance. Corresponding text and button colours are also in contrast to the foreground and background
- Provide informative, unique page titles - The page titles help show the user the distinction between the log-in page and post log-in page calculator (Log In to TDEE Calculator and TDEE Calculator)
- Help users avoid and correct mistakes - The error messages that pop up help users identify the mistakes they've made in form submissions
- Reflect the reading order in the code order - The HTML code (even without CSS) reflects the order in which information is presented on the webpage
