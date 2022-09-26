Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

Baseline Requirements
---

- a `Server`: Using express.
- a `Results`: username, win and loss will be displayed accordingly for each user.
- a `Form/Entry`: As the nature of a game application, the player are allowed to create, modify, delete user-related data but not the in game data such as win and loss.
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
Well, I failed but I really think that I deserve some partial credits for this. I spent way too much time trying to deploy my project to Heroku. But it just doesn't like the Mongodb atlas.
