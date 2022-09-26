a3 README
---

## Name-a-Rat 1.5

your glitch (or alternative server) link e.g. http://a3-charlie-snow.glitch.me

- This is a website that allows you to log in and name a rat.
- I ran into many problems getting it to work. The biggest hindrance was a 503 error I was getting when trying to GET and POST. I wasn't able to figure out what was causing this issue within the deadline of the assignment. While my MongoDB doesn't work, I had set it up so that had I been able to GET and POST I could've gotten it working.
- The authentication strategy I used was OAuth via GitHub, as I found it was simpler to set up than it appeared.
- The CSS framework I used was PureCSS because it is a simple CSS framework that I like.
- I used mongodb, mongoose, passport, connect-ensure-login, and express-session
  - I used MongoDB to set up my database in the app
  - I used mongoose to connect to the MongoDB database
  - I used passport to sign in with OAuth
  - Connect-ensure-login allows me to ensure a user is logged in.
  - Express-session allows me to create an express session

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy
- **Tech Achievement 2**: I made an attempt to host this on Heroku at https://charles-snow-a3.herokuapp.com/, but unfortunately ran into some errors that I did not get on glitch.
- **Tech Achievement 1**: I got 100 on all 4 of the lighthouse tests

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
  - Provide informative, unique page titles. The title pages in my website are "Name-a-Rat Login" and "Name-a-Rat" main page, which tell the user everything they need to know concisely about the two pages.
  - Use headings to convey meaning and structure. I use headings to clearly inform the user on the content below it.
  - Write meaningful text alternatives for images. I put alternative text on the images which meaningfully conveys what the image portrays.
  - Keep content clear and concise. I only display in my content what the user needs to know so as to not overload them with information.
  - Provide clear instructions. Through the use of titles and other onscreen text, the user is clearly instructed where to click or what to enter.
  - Don’t use color alone to convey information. I use red to display the rat name to make it contrast with the rest of the text. This does not convey any information that would be necessary to display in an alternate format.
  - Ensure that interactive elements are easy to identify. All interactive elements are made clear by being comprised of either input fields, buttons, or the log in with GitHub button.
  - Ensure that form elements include clearly associated labels. In both the form components I have I included informative labels as placeholder text within them.
  - Include alternative text for images. I included alternative text in every image within this applications.
  - Reflect the reading order in the code order. The HTML is displayed in the order in which you should read or interact with the elements.
  - Ensure that all interactive elements are keyboard accessible. Through testing I have made sure that all necessary elements can be selected and interacted with using only the keyboard.
  - Include image and media alternatives in your design. I included alternatives for anything that required it.
- **Design Achievement 1**: My website follows the CRAP principles.
  - I used contrast to make all the elements stand out without being hard to look at. I used a white background with either black or white text, and only dark colored images.
  - I used repetition to make things the same between pages. They have similar titles with the content below them.
  - I used alignment to left-align everything, as I felt that was the best alignment for the app.
  - I used proximity to keep everything together. No elements are very far away from each other.
