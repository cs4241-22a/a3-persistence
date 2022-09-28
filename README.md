Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

## To Do List Generator

Frank McShan
http://a3-frank-mcshan.glitch.me

My web application is a to do list generator that lets users input a task, a creation date, and whether or not the task is a priority. After submitting, users can view all of their to dos in a convenient table. From there, they can modify or delete table entries. The goal of this application was to create an easy way for users to keep track and manage their tasks. A plus about the application is that it will sort entries based on the due date, allowing users to visualize tasks with sooner due dates more easily. I faced several challenges in realizing the application. A major challenge was figuring out how to save changes to individual table rows to the database. Another challenge was figuring out how to sort entries based on the date - this was completed using a sort function. The authentication strategy I chose was using cookies because it seemed to be the easiest to implement and understand as a whole. I used the CSS Bootstrap framework. I chose the framework because it makes web pages appear simple and easy to read. The color and font choices used throughout the framework are aesthetically pleasing and simple - it makes the application look more polished and professional. I used five middleware packages in this application. I used express.static() to serve static files, which includes my JavaScript file containing scripts for the application. I used express.json() to parse incoming requests with JSON payloads so that it would be easy to interact with incoming requests using the request body, rather than having to use JSON.parse() each time. I also used express.urlencoded() to parse incoming requests with urlencoded payloads, and the extended:true component was used to allow for rich objects and arrays to be encoded into the URL-encoded format. This was used for putting key-value pairs into an object for authentication. I used the built-in favicon middleware package to implement a custom favicon for my site of a Pride heart. Finally, I used cookie middleware to properly authenticate a user. The cookie has a session and keys associated with it, and they are then parsed into an object used by the server to validate a user's credentials.

## Technical Achievements
- **Tech Achievement 3**: I got a 100% in all four lighthouse tests required for this assignment.

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative:

-Provide clear instructions: I let users know when they have successfully created a new account and when a data row is updated, both through alerts using simple, easy-to-understand language.

-Keep content clear and concise: I followed this guideline by having all text on the application be simple and easy to read, while avoiding complex words and phrases.

-Provide sufficient contrast between foreground and background: I contrasted the black text and blue/red/green buttons throughout my application with a light gray background.

-Don't use color alone to convey information: I added text to all buttons to better indicate what they do, so that the user doesn't need to assume (ex. red button must mean delete).

-Ensure that interactive elements are easy to identify: I utilized distinct styles for my buttons using the Bootstrap CSS framework. All buttons have rounded corners, and the button colors correspond to their functionality (ex. green to save, red to delete).

-Provide clear and consistent navigation options: I made sure that the flow of users interacting with the application has consistent naming, styling, and positioning. All objects are centered and feature the same font, background color, text color, and button styling.

-Ensure that form elements include clearly associated labels: I added labels next to each element on both my login form and my form for submitting new to dos.

-Provide easily identifiable feedback: I provide feedback for certain user interactions, including when a new user account is created, and when the user saves changes to a particular data row via an alert.

-Associate a label with every form control: I associated a label with every form attribute.

-Identify page language and language changes: I indicated the primary language of every page by using the lang attribute in the html tag.

-Reflect the reading order in the code order: I ensured that the elements in the code match the order of the information presented. Initially, I had the form attributes presented on one line, and it would get almost jumbled in with the table. By re-organizing this layout, the code order reflects that of the reading order. To confirm this, I removed the CSS styling and saw the content order still made sense.

-Ensure that all interactive elements are keyboard accessible: When modifying data, all rows in the table were changed from labels to show up as input fields, allowing the user to tab and easily edit a particular field, and then tabbing over to the save button to which they can then press the enter key to save.
