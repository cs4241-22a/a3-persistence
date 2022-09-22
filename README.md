## TV Show Tracker
https://a3-grace-yue.glitch.me/

The goal of the application is to provide a TV show tracker web app for users to enter statistics about the shows they watch or plan to watch.

The authentication strategy used is to have the login form double as a registration form. If you try to log in with a new username (one not in the database) and any password, it will create a new account for you automatically. However, if you later try to log in with the same username and the "wrong" password, it will recognize that a user already exists in the database and expect the correct password. This strategy was chosen for simplicity.

I used the CSS framework Sakura, because it had a nice modern, simple, and centered look that I liked. I enlarged the font size from 65% to 85%; otherwise, the only changes I made were some padding on the table, tr, and td elements, as it made the results table look bad.

Express middleware packages:
1. express.json(). Converts data to JSON.
2. express.urlencoded(). Interprets urlencoded payloads (i.e. from HTML forms).
3. express.static(). Tells Express where to serve static files from.
4. cookie from cookie-session. Adds a session property to each request body for authentication purposes.
5. Morgan. Logs information about GET, POST, and PATCH requests to the console.

## Technical Achievements
- **Tech Achievement 1**: I got 100% on all four Lighthouse tests -- screenshot in repo.

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...

1. Associate a label with every form control -- All form fields have semantic label elements to indicate their purpose.
2. Reflect the reading order in the code order -- Both HBS files are logically organized according to visual page presentation.
3. Ensure that all interactive elements are keyboard accessible -- All form fields and buttons can be accessed and activated via the Tab and Enter keys.
4. Provide informative, unique page titles -- Both pages are labeled clearly with the name of the app (TV Show Tracker) present for consistency.
5. Use headings to convey meaning and structure -- Page sections, forms, and table columns have clear labels.
6. Keep content clear and concise -- The webpages have minimal content.
7. Provide sufficient contrast between foreground and background -- The font is black on white for readability, and the buttons are clearly contrasted with the page and with the text on them.
8. Don’t use color alone to convey information -- The only color-coded element is a red error message that shows up when the user tries to submit a duplicate show, and that is also bolded and of prominent font size to stand out.
9. Ensure that interactive elements are easy to identify -- All buttons are color-contrasted and logically positioned, and all form fields are clearly labeled.
10. Ensure that form elements include clearly associated labels -- All form fields are clearly labeled, both visually and semantically; see #9.
11. Provide easily identifiable feedback -- User login errors redirect to another page entirely; any attempts to submit invalid data prompt on-screen feedback in large font below the form.
12. Use headings and spacing to group related content -- The page elements are well-spaced out, and on the one page with more than one form, the form is clearly separated (by a border and extra padding) from the results table below it and the headers above it.