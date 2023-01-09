# BOOKish NOOK (now with MongoDB capabilities!)

https://coral-app-gxbph.ondigitalocean.app/

I implemented my application from A2, BOOKish NOOK. Once again, users can log their reading but this time the data will persist between sessions. 
Users can add, delete, and edit reading entries into their 'library.' I struggled the most with getting the correct paths and calls to MongoDB in order to be able to allow users the add, delete, and edit functionalities. However, the API was well-documented and I was able to get it. I had the beginnings of a login system as part of my authentication strategy, but struggled to get it working. 

## CSS Framework

I used Bootstrap as my CSS framework of choice. I liked the simplicity and sleakness of Bootstrap. When I was looking into different frameworks, I read that Bootstrap's grid system was one of the most flexible and response. I ended up ultilizing this in my two column approach to the webpage. The majority of my edits via CSS was color changes or playing around with the spacing (which was a struggle).

## Express Middleware

I used the following Express Middleware packages:
- 1. ejs, which passes data from the database to the browser to display content.
- 2. body-parser, which parses JSON data.
- 3. response-time, which records the time it takes for a server to respond to an HTTP request.
- 4. cookie-session, which 
- 5. errorhandler, which displays as much about error in development when it occurs. 

## Technical Achievements
- **I deployed the app on Digital Ocean**: I preferred this method to using Glitch because Digital Ocean deployed my application straight from GitHub. Had I used Glitch, I would have had to import my files. The downside to Digital Ocean and other services like Heroku is that (1) they require a credit card to get started and (2) they're going to cost you once your free trial is up. In that sense, Glitch is a more budget/student-friendly option of deployment. Both Digital Ocean and Glitch can auto-update the deployment when changes are made.  
- **100% on Google Lighthouse**: The app scored 100% in all four lighthouse tests required for this assignment (see screenshot in the google_lighthouse folder).

## Design/Evaluation Achievements
- **I followed the following tips from the W3C Web Accessibility Initiative**: 
1. Provide sufficient contrast between foreground and background. I run the foreground and background colors through the Adobe Color Contrast Checker and it passes WCAG AAA level standards.
2. Provide informative, unique page titles. Each of my pages had a different, descriptive title. 
3. Help users avoid and correct mistakes. I include placeholder text in all my form input boxes. This helps users better understand what input is being requested and the format.
4. Include alternative text for images. I used empty alternative text for the decorative icons on my page. 
5. Provide clear instructions. I provide concise instructions for users to add and edit a book entry. 
6. Keep content clear and concise. I wrote short but clear sentences for the instructions.
7. Ensure that all interactive elements are keyboard accessible. All my form components can be accessed via keyboard. 
8. Associate a label with every form control. All my form components have a label. 
9. Write code that adapts to the user’s technology. I avoid horizonal scrolling and the app will adapt to different sizes.
10. Ensure that interactive elements are easy to identify. Buttons and input fields are easy to identify by eye.
11. Ensure that form elements include clearly associated labels. All of my form elements have labels.
12. Use headings and spacing to group related content. The different forms have headings and spacing that indicate what goes into each form. 
