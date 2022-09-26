Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===
The app is a schedule app designed to let users create their own weekly schedules in their browser
Example user: {"User", "a"}

https://a3-greg-klimov.glitch.me/login

A significant challenge I faced in making the application was the difficulty associated with enabling multiple html and css files to remember which user is currently logged in. Inifially it was up to the server to remember which user was logged in, but after doing some research, I decided to enable the window object to save the username after the user logs in (and only after the user logs in)

A simple username/password check with the window saving was easy to implement, and the bcrypt back end encryption was was a simple addition to that.

I used Bootstrap because it was one of the first frameworks I found, though I kept most of my color scheme and table layout because the table did not have the necessary color contrast.

Express middleware packages: 
Express.static - serves files in a static folder 
express-slash - adds or removes trailing slashes
helmet -  
passport -  
favicon - adds an icon to the website tab


Css Framework: Bootstrap
NOTE: sometimes https://a3-greg-klimov.glitch.me/ does not properly redirect to /login. If this happens, please go to https://a3-greg-klimov.glitch.me/login manually

Acheivements
---
100% on Lighthouse Tests on all pages (Login, Register, Home) in desktop mode. Note: This was done with a blank calendar as users can specify their own colors 

encrypted passwords on database using bcrypt

CRAP principles in the Non-Designer's Design Book readings: 
Which element received the most emphasis (contrast) on each page? 

  The table header and form text labels received the most contrast because they are effectively the main source of information on the page. The Headers have to contrast with the other, less important cells. The form labels have to stand out and be readable so that the form can be easily filled in. The bottom form areas and the smaller table view are shaped differently than the schedule, so that they are separated. Moreover, the forms, being the only way for the user to enter information are laid out differently to the table and schedule. The details dropdown elements also help differentiate between the sections, and they enable users to create more contrast for themselves if they only want to see one of the big interaciton areas.
  
How did you use proximity to organize the visual information on your page? 
  The large schedule view is positioned so that it takes up the main space of the page, while still being under the header and close to the table view because the table view is meant to reflect the information in the schedule. The forms are shown under the table view because the table view reflects the information entered into the forms, much more so than the schedule reflects the forms, so the forms are put closest to the table and further from the schedule view. The Header at the top both welcomes the user, and offers the user the option to log out in the same space because that is the only time the user's username is mentioned on the page, and because if the user is logged into the wrong account (as seen in the welcome message), the logout button is right underneath it.
  
What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site? 
  I repeatedly used the same color scheme: dark grays for the background, orange for large headers and sections, and yellow for details, table headers, etc. The login and register pages are also laid out the same way, so that users can enter in the information more efficiently when creating an account. The font is also uniform throughout, except for the shadow on the main page headers for the home, login, and registration pages. The design of the home page is also repetitive in that the schedule, table view, and the subsequent form sections are aligned vertically so that they form repeating, horizontal rows. The repetition of the times and dates on the schedule also come to mind, though they are necessary in any schedule.
  
  
How did you use alignment to organize information and/or increase contrast for particular elements. 
 On the login and registration pages, the password and username boxes are in line with each other but not with the main header and with the register/login link below. rather they are more indented, so that they stand out as the main focus of their respective pages. On the home page, the header, schedule, table, and subsequent forms are aligned vertically so that they can be traversed from the top down. The forms section, however, is aligned/grouped differently because that way the overall forms section is aligned visually with the others and because the forms section is the place for users to edit the information in the schedule/table view. Both the table and schedule are centered and fill the page so that the entire schedule fits.
