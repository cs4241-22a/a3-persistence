## Kawane Moene's Guest Book

https://guestbook.kmoene.com/

The goal of this application is a tool for my visitors to sign my guest book.

The main challenge that I faced during the development of my app was how to make sure multiple devices stay sync in **real time** with the mongo db.

I used GitHub OAuth for the authentication method because I do not need to maintain my own user database which increases security and decrease maintainence cost. There are logics on all critical APIs to safe guard the access.

The CSS framework I used was Semantic UI. However, to maintain that WPI 2000s aesthetic, I only applied the CSS framework to UI widgets.

The app is a guest book, it is designed to show all the data in the database. But the user can only edit and delete their own message. There are logics on both the client and the server to enforce this policy. 

Middleware used:
* `cookie-session` handles user's session with cookie
* `compression` compresses the webpage
* `static` serves static files
* `connect-rid` generates unique request ID
* `json` processes JSON data
* custom middleware to change X-Powered-By to a custom value

## Technical Achievements
- **Tech Achievement 1**: GitHub OAuth inplemented
- **Tech Achievement 2**: Hosted on Vultr behind Cloudflare

### Design/Evaluation Achievements
- **Design Achievement 1**: 
* Reflected the reading order in the code order
* Used color and icon to convey meaning of buttons and server connection status
* Nothing on page were referred using color alone
* Identified page language and language changes
* Input field using WAI-ARIA
* Links are all styled when they are hovered, clicked, and focused
* Banner image contains an `alt` attribute
* All input fields contains placeholder as hint to the user
* Contents are orgnised with correct headings
* All links are meaningful and without ambiguous text like "click this"=
* All input fields are clearly marked with instruction
* All texts in the page are contracted with the white background.

- **Design Achievement 2**: 

According to the CRAP, the image banner on the webpage actually recieves the most attention which is bad. The website needs to guide the user's attention to the most important content like the title or the main paragraph. However, this is common among websites in the late 90s and early 2000s which is what I am aiming to create in this assinment. To preserve the aesthetic I have to use an image banner with compressed image to lure the user's attention.

Proximity is very important since it gives the user a clear idea on what objects are closely related and what are not. I used CSS flexbox and bold and clear H1 and H2 to split contents into clearly defined groups to make sure only related information are near each other. The policy area only contains the website's usage policy, and the interactive area only contains user interactable contents and does not includes static long informative passages.

The design is very consistance in this website. It recreates an early 2000s WPI website aesthetic. The H1 uses a bold WPI red that's very iconic to WPI. All H2 are using the same gray that usually appears together with the WPI red to further give the user a hint that "This website looks like BannerWeb!" or something similar. 

All elements on this website are aligned for both visual and usability. All elements in the main website are left aligned(and still looks pleasing thanks to css flexbox) and the login page is centre aligned to give the user a very clear instruction that they need to click the button to login with their GitHub account.