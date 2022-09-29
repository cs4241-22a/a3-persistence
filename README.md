Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

## To Do App
Molly Sunray
http://a3-molly-sunray.glitch.me

The goal of my application is to allow users to keep track of their tasks in a to-do list by inputting the task description, category, deadline, and priority. The user also has the ability to modify and remove to-do items. The application includes a login page and a page that displays the user's to-do items in a table. One challenge I faced while creating this application was displaying only the logged-in user's to-do items in the table. Another challenge I faced was enabling the user to modify existing to-do items by changing the corresponding row to include input fields and dropdowns. I chose to authenticate the user by using cookies through the cookie-session middleware. I chose this authentication strategy because it seemed the easiest to implement. I used Bootstrap as the CSS framework because I like the styling of Bootstrap and have some prior experience with this framework. I added some custom CSS to make my application responsive to smaller screen sizes. This included modifying margins and the size of form buttons. The five Express middleware packages I used were express.static, express.json, express.urlencoded, cookie-session, and express.favicon. The express.static middleware serves files from within a given root directory. The express.json middleware parses JSON requests and populates the body object with this data. The express.urlencoded middleware is used to get data sent by form actions. The cookie middleware is used to store cookie-based sessions. The favicon middleware is used to serve a favicon for a site.

### Technical Achievements
- **Tech Achievement 1**: I achieved 100% in all four lighthouse tests required for this assignment.

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
  1. Provide informative, unique page titles: I provided titles for both pages of my application that distinguish them from each other.
  2. Provide sufficient contrast between foreground and background: I used font colors that have sufficient contrast with my application's background color.
  3. Don’t use color alone to convey information: I used both color and text to convey the priority for each task by using Bootstrap badges.
  4. Ensure that interactive elements are easy to identify: I used the styling from Bootstrap to make the buttons in my application easy to identify. The appearance of the buttons changes on mouse hover.
  5. Ensure that form elements include clearly associated labels: I added labels to the input fields on the login page and the input fields in the to-do list form.
  6. Provide easily identifiable feedback: I alert the user when they create a new account. I also provide feedback when the user leaves a field blank in the login form and to-do list form.
  7. Create designs for different viewport sizes: I adjusted the buttons and spacing between input fields for smaller screens.
  8. Associate a label with every form control: I linked a for attribute on the label element to the id attribute of the form element for every form control in my application.
  9. Identify page language and language changes: I indicated the primary language on both pages of my application by using the lang attribute in the html tag.
  10. Reflect the reading order in the code order: I ensured that the order of elements in the code match the logical order of the information presented.
  11. Write code that adapts to the user’s technology: I used responsive design to adapt the display and modify the appearance of the forms for smaller screen sizes.
  12. Ensure that all interactive elements are keyboard accessible: I ensured that all input fields and buttons are keyboard accessible in my application.
