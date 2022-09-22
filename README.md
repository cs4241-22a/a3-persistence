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

- **Design Achievement 2**: I followed the following tips from the W3C Web Accessibility Initiative...