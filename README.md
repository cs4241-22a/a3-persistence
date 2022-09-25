Assignment 3
===

Due: September 22nd, by 11:59 AM.



Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

---
The project of:
    Andrei Ignatiev:
        alignatiev@wpi.edu

Droplet URL: http://164.90.252.100:3000 /
Glitch link (For design tip changes): 





## Kurtz's Cars Auction Management Service

I built upon my idea from the second project. The business, Kurtz's Cars has evolved into an auction manager. The website acts as a portal for sellers who wish to show their cars at a hypothetical auction. Once a client creates an accout, they can add, remove, and modify cars that comprise their sellable inventory. Furthermore, users can alter essential data associated with their account. Namely, their name and password. There were many challenges in this project. Overall, it was a slog from start to finish. Difficulties that stood out include synchronizing server actions with mongodb and the subsequent handling of promises that required adding async and await to and into the bodies of functions. I chose to not deal with any fancy authentication strategies and stuck with the email + password combination for simplicity. I also chose to make things easy by implementing a fairly bare bones CSS template. I selected the pure framework. I found that it was easy to include in html, user-friendly, and easy on the eye. Some of the colors, fonts, and dimensions were carried over from the A2 iteration of the website. 

The five middleware packages that were used are listed below: \
    serve-static: load html pages, CSS \
    body-parse: interpret http requests \
    body-parseJSON: interpret JSON data \
    cookie-session: maintain user session upon succesful login \
    env: process environment variables and mongoDB





## Technical Achievements
- **Tech Achievement 1**: Using a combination of...

I hosted my site on DigitalOcean instead of Glitch. Compared to the latter, it took a long time to set up. Negatives about the service involve the financial aspect and the significant setup needed to get the droplet into working order. I needed to install the necessary software (nodeJS, middleware packages) and copy over all of the code onto the virtual machine. However, on the positive side, you do not have to use your personal IP address for hosting purposes and you have full access to the entire application stack.

### Design/Evaluation Achievements
- **Design Achievement 1**: 

(I followed 6 design tips in the hopes of getting 5 points as opposed to 12 for 10):



Unique Page Titles - Each of my four pages has a title reflective of its function. The login, update, main, and sign-up pages are identified as such in their corresponding browser tab.

Clear and Concise Content - The components of my website convey information with a minimal amount of text. Only the bare essentials are stated: log-in, manage you lineup, modify your account information, etc. Further, the image I selected is themetacially relevant and does not conflict with the interactive elements of the webpage.

Sufficient Contrast - Achieving proper levels of contrast took a bit of work. The default text color for my CSS template was far too similar to the web-page background color. I inserted inline CSS that overrode the stylistic framework and changed the color of affected elements.

Easily Identifable Interactive Elemenets - All of the website's buttons and links have a hover effect attached to them. The update and log-in buttons are big, blue, and impossible to miss. The automobile management buttons, 'go' and 'delete entry', are similarly conspicious. Finally, the links in the overhanging tab above the webpage attract the user's attention. They need to be clicked in order to travel to different parts of the website so I gave them a pleasant blue color. Conversely, a link is blacked out when it is of no use given where a user is inside the site.


Clear and Consistent Navigation Options - As stated above, the buttons and links that transport the user from page to page are denoted by a flamboyant color (often blue) to draw attention. Each page has a heading in the top left that states the page's purpose. This is accompanied by a little blurb that elaborates slightly on its use. The combination of clear links and description should be enough to help the user's orientation.

Clear Labels - Many of the forms have labels associated with them. These include, the login, signup, and update elements. In places where there aren't any labels, the whitespace inside of the form textboxes tells the reader what needs to go there.  





