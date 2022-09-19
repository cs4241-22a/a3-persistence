## Player Score Entry

[Glitch Link](http://a3-dtavana.glitch.me)

- This application is responsible for submitting a players name, score, and win result. The application then saves that data and ties it to the authenticated user
- I found it challenging to decide what CSS framework I wanted to use
- Implemented the GitHub OAuth strategy in order to receive extra credit
- Decided to use the MUI CSS framework due to a suggestion from a friend that has used it previously
- Express Middleware:
  - Implemented custom middleware functions to determine whether a user is currently authenticated
  - Implemented the body-parser pacckage to succesfully parse incoming JSON data
  - Implemented the express-session package in order to help with OAuth authentication
  - Implemented the passport package in order to help with OAuth authentication
  - Implemented the morgan package to enable logging of API endpoints

## Technical Achievements

- **OAuth Login**: Implemented OAuth authentication via the GitHub strategy using the passport.js library
- **Lighthouse Tests**: Achieved 100% on all four required lighthouse tests
