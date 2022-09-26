## To Do List
Eri Kim

https://a3-eri-kim.glitch.me/

Goal: This web application can serve as a To Do List. 
Challenges: I faced difficulties when trying to redirect to a login page if user is not authenticated. It took a while to debug; however, it is fixed now and the website is working as expected.
Authentication Strategy: I used OAuth authentication via the GitHub strategy using passport.js.
CSS Framework: I used Bootstrap because I am most familiar with it and it is easy to implement (class="mt-4 align-items-center etc...").
Middleware packages:
- passport: Allows OAuth, and in this project, GitHub strategy
- express-session : Creates and manages a session middleware
- compression: Compresses response bodies for all request that traverse through the middleware
- serve-static: Serves files from within a given root directory
- ensureAuthenticated: Ensures that the user is authenticated, if not, it redirects you to the login page

The server was created using Express.
The Results functionality was implemented so that all data that is associated with a logged in user is displayed.
The Form/Entry functionality was implemented so that users can add, modify, and delete data items associated with their github account.
Both pages - index.html and login.html - have at least 90% on the Performance, Best Practices, Accessibility, and SEO.

## Technical Achievements
- **Tech Achievement 1**:  I used OAuth authentication via the GitHub strategy.

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed 12 tips from W3C.
- Used headings and spacing to group related content for the bar that is used to create a todo item (textfield, datefield, and dropdown menu).
- Included alternative text for the logo image.
- Ensured that form elements include clearly associated labels
- Provided sufficient contrast between foreground and background
- Identified page language and language changes:  <html lang="en">.
- Kept content clear and concise by writing iin short and clear sentences and avoiding the use of complex words.
