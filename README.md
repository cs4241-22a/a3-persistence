Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===



## The Alfie Images Board

Visit the Alfie Images board here: link e.g. [https://a3-sophiastrano.glitch.me/login]

For this assignment, I decided to resurrect my failed plans from assignment 2. The goal of this application was to create a 
cute webpage with pictures of my adorable cat while addressing the need to be able to add, 
modify and delete unique responses to create a full-fledged application. I settled on a board of images of Alfredo,
which allows users to choose and nickname their favorite picture of Alfie. This application offered a myriad of challenges for countless reasons
To address concerns about lighthouse performance, the Alfie images were converted from .img files to .avif files to avoid slowing load times. 


This assignment was a massive learning curve due to my lacking any experience whatsoever with setting up a server and no networking background- "persistence" was a great name choice. For example, rerouting pages after sending login information was highly challenging because of the nature of POST requests.
I chose to add user data to the database via custom middleware and the mongodb connection as it was the easiest to implement. 

I chose to use bootstrap for this assignment as it seemed the most conducive to the way I'd been learning CSS up to this point, and was widely accessible.
I was able to use bootstrap's grid framework to re-organaize the elements on each of my pages, and found this to be much cleaner and easier to use than the flexboxes I struggled with previously. I only slightly modified the bootstrap framework to quickly include background colors, as this was a very minor change
that was more straightforward to style myself based on the available boostrap documentation about the addition of background colors. 


 1. Express-sessions: This middleware allows express to more easily interact with user sessions
 2. Cookie-sessions: This middleware allows for sessions to be managed via cookies in broswer
 3. mongodb: This middleware allows for easy connection to the database 
 4. express-handlebars: This middleware allows for popups and other rendering
 5. The custom middleware I built tracks user authentication

**I chose to focus on design achievemnts for this assignment due to difficulty level**

## Design/Evaluation Achievements
**Design Achievement 1**: I chose to focus on accessibility for the majority of my achievements in this assignment.
 I followed the following tips from the W3C Web Accessibility Initiative:
 
 1. Provide sufficient contrast between foreground and background 
    - I was sure to use strongly contrasting shades of pale and dark orange on these pages to ensure visible contrast between text and background, and to ensure that
   meaning would not be lost if the user had difficulty recognizing colors. 
 
 2. Provide informative, unique page titles
    - I took care to ensure each page was clearly labeled for its specific purpose, and broke up pages to be clear and direct. Each page informs you of its purpose, i.e. "Create a new user" , "view your previous responses", and clearly directs you to other desired pages
    
 3. Make link text meaningful
    - All link text brings you to the specified place being described, and each link is placed in large, centrally located font
   
 4. Provide clear instructions
    - Detailed instructions and the purpose of the application for new users are included on the create-an-account page, as well as brief more concise instructions on the main page once logged in to direct returning users. 
   
 5. Keep content clear and concise
     - All content is shorthand and descriptive to convey critical ideas but not crowded on the primary pages users are served, with longer-format information being consolidated to a single emphasized text box. 
    
 6. Ensure that interactive elements are easy to identify
    - All forms and links are clearly labeled as to their purpose, and as to how to enter/submit that information through the use of field text and well-labeled buttons. 
   
 7. Provide clear and consistent navigation options
    -  Each page contains some kind of clearly marked return link in large text to ease navigation between pages, so that users aren't forced to manually navigate in browser. 
   
 8. Ensure that form elements include clearly associated labels
    - user log in, edit and delete fields are all labeled clearly in each form, with each form field having a unique identifer with a meaningful name describing the expected input.
   
 9. Use headings and spacing to group related content
    - headers are spaced accordingly to group related content in sections on each page, with boxes being centered, emphasized, and ordered to logically and easily direct users through the application appropriately. 
   
 10. Include alternative text for images
     - Alt text is provided for each image of alfie in the event that image cannot be rendered, although it does make it difficult for the user to submit their opinion if they cannot see the image.
   
 11. Identify page language and language changes
     - All languages are clearly defined to indicate any changes between HTML/JS, and english is clearly labeled as the primary language. 
   
 12. Use headings to convey meaning and structure
     - Headings are used to break-up the view on each page for readability, and to highlight areas that the user is encouraged to interact with to improve readability.
    
 **Design Achievement 2**: I took the CRAP principles into heavy consideration when designing my website.
 - *Contrast* :
    - Contrast is one of the most important features in ensuring clarity, accessibility and general readability of a page, and was taken into strong consideration when styling each page and individual element of the Alfie Images board. I made sure that the primary header had the highest contrast on the page by altering the original color scheme I created to include paler, creme shades of orange and darker brown tones to bring emphasis to certain sections. The contrast between the text, borders, and background on my primary site headers is much higher than that of the secondary headers, to encourage the user to examine the page’s title/primary purpose before moving on to other aspects of the page. I chose to add a lighter contrast around the Alfie images as their size and color variety is already eye-catching, ideally further leading users to naturally read the page title and instructions before proceeding.
 - *Repitition* : 
   - Repetition was another key aspect in designing the Alfie application, through the monochromatic theming being consistent on each page, and the repetitive format of the Alfie image grid to ensure simplicity. I repeatedly chose the same shades of orange to ensure high contrast with consistency while also preventing the page from becoming busy, and ensuring that users do not rely on color alone to derive meaning from the page. Text is repeatedly centered on each page, and basic instructions are repeated concisely on each page to ensure meaning is not lost. Repeated and consistent header format from each page helps to ensure the reader-view flows seamlessly from page to page. I also was sure to format the link text in the same way on each page with the text being contained in a secondary header to clearly direct the user to the next page.
 - *Alignment* :
   - Alignment was an important and challenging aspect of the Alfie Image board design process. I greatly struggled with the use of flexboxes and grids previously, but I was able to use bootstrap grids to cleanly align things on each page while creating much cleaner, more semantic HTML/CSS. Important headers are aligned in the center of the page, and page elements are contained in bootstrap grids to properly space and move from line-to-line to create an easy visual workflow. Elements that have similar or analogous functions are grouped together in other containers to improve both styling and clarity. The alfie images are carefully aligned with their number tags in a 9x9 grid, contained within another element that is centered on the page, to draw attention to the primary aspects of the application. 

 - *Proximity* :
   - Proximity was one of the most important aspects when it came to deciding how to break up my website into a variety of pages, as well as order information within a page. As touched on briefly in the alignment section, important elements are grouped together, such as the user and password input fields. Elements were specifically grouped together so that primary page titles, the alfie image grid, and secondary headers containing links had consistent and clear styling, while also being semantically ordered on the page so that the user comprehends and then completes each task in the intended order. For example, the “create a new user” is located directly next to the log-in option, so that if a new visitor needs to make an account, they are immediately visually directed to the next link they will need.

The unexpected outcome of this is that I unfortunately never want to look at any of these pictures of Alfredo ever again. 
 
