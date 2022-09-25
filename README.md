## Counter

https://narrow-political-scarer.glitch.me

Counter is a simple website designed to help keep track of numbers. A user can make an account or login using an existing one.
There are 2 existing public accounts should you want to login immediately. The first is user1 with a password pass1, and the second
is user2 with password pass2. Once logged in, you can add or subtract numbers from the total using the Add a number field,
or remove a submission index using the remove a number field. A logged in user can delete their account using the delete account button,
and no further information will be recorded. (However they will still be allowed to interact with the interface.)

There were a few challenges with the application, mainly converting existing code into express. Especially where
the database was concerned, I had a hard time getting the inputs on the website to properly connect and
update the database content. Another issue was with redirecting the user. For some reason, whenever trying to
redirect them to a new page, there was a 'GET: could not get /url' error. This resulted in the need for the user
to do the page navigation manually.

The authentication strategy I chose was based off of the class example. However, I added functionality to check
in the database to ensure that the usernames and passwords were more secure. The username is compared to the stored
password, and must match in order to advance the user to the next page.

I used the Tacit framework for the CSS of the website. I chose it mainly because it was simple to implement,
and kept most of the formatting I had done initially unchanged. It was helpful to choose a classless framework as well, becuase it simplified the interface

Express Modules used:
- serve-favicon: adds a custom icon to the webpage
- express-timeout: times out html requests after 5 seconds
- response-time: logs response time for html requests
- cookie-session: creates a login session for the current user to keep track of data
- serve-static: replaces express.static for serving the public folder

## Technical Achievements
- **Tech Achievement 1**: I designed both pages to achieve 100% Lighthouse rating

### Design/Evaluation Achievements
- **Design Achievement 1**: 
I followed 12 tips from the W3C scchool for writing, designing, and developing websites.

1. My headings convey meaning and structure. The headings are used in this case to direct the user as to the different uses of
each of the fields. For example, on the login page, they let the user know which input fields are used to log in or create a new account.

2. My pages provide clear instructions as to how to use the website. The page explains to the user how to operate the website in a clear and consice manner

3. The content is clear and consise. As explained before, the operation of the website is described to the user upon logging in, and remains unobtrusive should they find the interface intuitive

4. There is plenty of contrast between the background and foreground. Lighthouse gave the accessability rating as 100%, ensuring sufficient contrast

5. Color is not used as the sole way to convey information. The login buttons for example, also contain the text "Login" to help the user distinguish between them

6. Form elements have clear labels. As required by Lighthouse's accessability standards, each form contains a lebel that clearly states how the form is meant to be used

7. The headings and spacings are used to group related content. For example, on the login page, the h1 header is used to dilineate login info, while the h2 header is used to separate it from the new account info

8. Each label is associated with an input field. Lighthouse requires that each form is labled clearly, and as such, the page conforms with these standards

9. The HTML elements are laid out in the order the user is meant to read things. The most pertinent information is included at the top of the page, and the functional parts are included afterwards

10. Interactive elements are easy to identify. The buttons are provided in different colors, and the text fields are outlined in a high contrast color.

11. The navigation options for the website are clear and consistent. The user can expect that blue buttons will redirect them, while grey ones will update info on the current page.

12. The website helps the user determine where there is a problem. For example, if the login information is input incorrectly, the website helpfully displays a message that informs the user that the login info was incorrect.
