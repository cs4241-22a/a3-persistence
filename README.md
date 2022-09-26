Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

Baseline Requirements
---

- a `Server`: Using express.
- a `Results`: username, win and loss will be displayed accordingly for each user.
- a `Form/Entry`: As the nature of a game application, the player are allowed to create, modify, delete user-related data(unfortunately, password modification is not yet implemented) but not the in game data such as win and loss.
- Use of at least five [Express middleware packages](https://expressjs.com/en/resources/middleware.html).
  1. cookie-session 
  2. passport
  3. express-session
  4. express-handlebars
  5. mongoose
  6. bcryptjs 
- Persistent data storage in between server sessions using [mongodb](https://www.mongodb.com/cloud/atlas)
- Use of a [CSS framework or template](https://github.com/troxler/awesome-css-frameworks): Template used from [TylerPotts Login Template](https://github.com/TylerPottsDev/node-login-passport/blob/main/public/main.css)

## Technical Achievements
- **Tech Achievement 1**: 
1. I used OAuth authentication via providing a dummy account (also your  can register your own account.)
2. Dummy Account -- Username: grader | password: 123

- **Tech Achievement 2**:   
For all three of my pages, I get 100% in all four lighthouse tests.
1. Login page
![Login full score](/a3-persistence/images/FullScore2.png)
2. Register page
![Register full score](/a3-persistence/images/FullScore3.png)
3. Game page
![Game page full score](/a3-persistence/images/FullScore.png)

- **Tech Achievement 3**:   
Well, I failed but I really think that I deserve some partial credits for this. I spent way too much time trying to deploy my project to Heroku. But it just doesn't like the Mongodb atlas. If you know why this is failing plz let me know! 
1. app crashed and deployment failed
![bad](/a3-persistence/images/error%20info.png)
![really bad](/a3-persistence/images/Deployment%20error.png)

## Design Achievements
- **Design Achievement 1**: 
1. Use headings to convey meaning and structure - Table is structure with two input fields and you can direct from login to register and visa versa.
2. Provide informative, unique page titles - all three of my pages have title associated with the content, such as login, register and simple RPS
3. Ensure that all interactive elements are keyboard accessible - You may use tab and enter to navigate the website
4. Don’t use color alone to convey information - I use handlebars error message to inform the user with incorrect input and I also have a confirm function to have user confirm with their action
5. Ensure that form elements include clearly associated labels - The labels and placeholders to the all input fields clearly tell you what you should input
6. Provide clear instructions - The webpage is designed so that the user should be able to read the fields and understand how the website works, especially in the game page all instructions is informed
7. Use headings and spacing to group related content - In game/main page, the proximity is demonstrated as well as the logic grouping. All related information are grouped together with consideration.
8. Provide easily identifiable feedback - By using handlebars error messages allows the user to get very identifiable feedback
9. Ensure that interactive elements are easy to identify - in login and register page, the submit buttons really stand out with a blue color and same concepts applpied to the game page
10. Keep content clear and concise - all three pages are consistence in style and they are all easy to use. No useless information is put in any of the pages.
11. Provide clear and consistent navigation options - all navigation links are implemented with different colors and are underlined.
12. Help users avoid and correct mistakes - the handlebars error message is case specific and will inform the cause of the error so that user can correct mistakes as well as avoiding them for the next use