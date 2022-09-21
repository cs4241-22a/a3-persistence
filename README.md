## Inventory Manager
Website URL: http://142.93.202.135

The goal of this application is to help users manage their store's inventory. This allows for user's to track the quantity of an item and the price per unit
During this i faced challenges in moving my server to a droplet, this was because my droplet overwrote the USER .env variable to root, causing mongodb auth to fail. Additionally I struggled with setting up OAuth, because I didn't understand what I was doing until the end. I used Github OAuth for my authentication it was hard but not as bad as i thought, i chose this because I wanted to learn how for future projects. For my CSS frame work I used https://watercss.kognise.dev/ because I felt it had a really simple and sleek design. For my express middleware I used
1. passport: Allowed for 'easy' integration with github OAuth
2. express-session: Allowed for user id to be stored easily, making handling requests simple
3. connect-timeout: Stop's the server from doing a request if it's taking too long(5s for me)
4. serve-favicon: provides the client with a favicon easily
5. errorhandler: help's debug the errors in requests 


## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy
- **Tech Achievement 2**: I hosted my server on a digital ocean droplet: I found this to be a lot better than glitch, being able to push my code from my pc and pull it on the server was really convenient (I really don't like the glitch IDE). I also felt it was easier for debugging. After the initial learning curve I find this method a lot nicer.
