Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===



## The Alfie Images Board

Visit the Alfie Images board here: link e.g. [https://a3-sophiastrano.glitch.me/login]

For this assignment, I decided to resurrect my failed plans from assignment 2. The goal of this application was to create a 
cute webpage with pictures of my adorable cat while addressing the need to be able to add, 
modify and delete unique responses to create a full-fledged application. I settled on a board of images of Alfredo,
which allows users to choose and nickname their favorite picture of Alfie. This application offered a myriad of challenges for countless reasons
To address concerns about lighthouse performance, the Alfie images were converted from .img files to .avif files to avoid slowing load times. 


Rerouting pages after sending login information was highly challenging because of the nature of POST requests.
I chose to add user data to the database via custom middleware and the mongodb connection because it seemed easiest to do.

I chose to use bootstrap for this assignment as it seemed the most conducive to the way I'd been learning CSS up to this point, and was widely accessible.
I was able to use bootstrap's grid framework to re-organaize the elements on each of my pages, and found this to be much cleaner and easier to use than the flexboxes 

I struggled with previously. I only slightly modified the bootstrap framework to quickly include background colors, as this was a very minor change
that was more straightforward to style myself based on the available boostrap documentation about the addition of background colors. 


 1. Express-sessions: This middleware allows express to more easily interact with user sessions
 2. Cookie-sessions: This middleware allows for sessions to be managed via cookies in broswer
 3. mongodb: This middleware allows for easy connection to the database 
 4. express-handlebars: This middleware allows for popups and other rendering
 5. The custom middleware I built tracks user authentication

**I chose to focus on design achievemnts for this assignment due to difficulty level**

### Design/Evaluation Achievements
**Design Achievement 1**: I chose to focus on accessibility for the majority of my achievements in this assignment.
 I followed the following tips from the W3C Web Accessibility Initiative:
 
 - Provide sufficient contrast between foreground and background 
   - I was sure to use strongly contrasting shades of orange on these pages to ensure visible contrast
 
 - Provide informative, unique page titles
   - I took care to ensure each page was clearly labeled for its specific purpose
   
 - Use headings to convey meaning and structure
   - Headings are used to break-up the view on each page for readability
   
 - Make link text meaningful
   - All link text brings you to the specified place it's describing
   
 - Provide clear instructions
   - Detailed instructions for new users are included on the create-an-account page
   
 - Keep content clear and concise
    - All content is shorthand and descriptive to convey critical ideas but not crowded
    
 - Ensure that interactive elements are easy to identify
   - All forms and links are clearly labeled
   
 - Provide clear and consistent navigation options
   -  Each page contains some kind of clearly marked return link in large text to ease navigation
   
 - Ensure that form elements include clearly associated labels
   - user log in, edit and delete fields are all labeled
   
 - Use headings and spacing to group related content
   - headers are spaced accordingly to group related content in sections
   
 - Include alternative text for images
   - Alt text is provided for each image of alfie
   
 - Identify page language and language changes
    - All languages are clearly defined
    
 - **Design Achievement 2**: I took the CRAP principles into heavy consideration when designing my website.
 - *Contrast* :
    - I made sure that the primary header had the highest contrast on the page, followed by the images. 
 - *Repitition* : 
   - I repeatedly chose the same shades of orange to ensure high contrast with consistency to prevent the page from becoming busy.
 - *Alignment* :
   - I used bootstrap grids to make things nicely aligned
 - *Proximity* :
   - Proximity was one of the most important aspects when it came to deciding how to break up my website into a variety of pages, as well as order information within a page.

This assignment has driven me to the brink of insanity, made me contemplate dropping this major in my senior year, and has robbed me of all joy for the time being. Goodnight!
 
