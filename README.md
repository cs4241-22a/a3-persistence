Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

This app is a website for sharing user reviews of any video game played. Users can manually enter relevant information to enter a game review, and the system will generate corresponding recommendations based on the player's score. Players can browse existing reviews directly by clicking on "see reviews" in the center of the screen. Users can also delete or edit their own published reviews.

I use a lot of CSS positioning techniques, including but not limited to: padding, margin, margin-left/right/top/bottom, display:flex,align-itms,height,weight,justify-content, text-align, vertical-align.
CSS framework I used was bootstrap 5.1.1.

deploy has always been a problem, but I tried my best to complete the html and js.
Middleware used:
- serve-static to display login page on default
- cookie-session, to make sure a user doesn't have to log in every time
- body-parser, to provide JSON flexibility for HTTP requests
- mongoose, to provide wrapper for accessing Mongo with a schema for survey response
- passport, for authenticating GitHub login

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy
- **Tech Achievement 1** (10 points): I used OAuth authentication via the GitHub strategy


### Design/Evaluation Achievements
- **Design Achievement 1**: 
