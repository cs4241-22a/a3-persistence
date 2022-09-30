## Messenger

Digital Ocean: http://165.227.253.229/

- The goal of this application is to send message to receiver. For a similar use of note, user could view the detail information of the message they choose to send and be able to edit the corresponding messege and save witht the changes. 
- The most challenge I've met is to host the application on the external site. I've tried heroku for the first time but I don't know why there's nothing shown on the site with everything built and run appropriatedly. I've tried to switched from github connection to CLI. I installed and configured the heroku CLI and tried to build a new project, with every configuration updated with running `npm install --save --save-exact`, but still nothing happened. Then I changed to ditial ocean. The application site is still having issue with the deployment. I've viewed the log and tried to fix it from the error it gave me, but things are not working as what I expected. So I changed to the droplet channel, and redo everything in the console, including the configurations. Then I had the ip address working well with `node server.js`. However, when I terminated the window, the application crashed. I've tried to do the doman things,and did a lot researches, tried _go_ _daddy_, _namecheap_. I've tried `tmux`, `screen`, and other sync methods to make everything working in background, but failed. At last, I've used pm2 to solve it. pm2 is a great application for keeping a node process running regardless of crashes, basically whenever a crash occurs it just restarts node using the same script.  
- I chose password-based authentication(OAuth) strategy which is the most common one to me. Though using passport seems to be easier, I felt like passowrd-based authentication seems to be more appropriate to my app. 
- I've used bootstrap for stylesheet since it is easy to manage and configure. The syntax could be simply found on the official lib.
- I've changed the _body_, _table_, _title_, _header_ etc. stuffs to be my assigned color and font.
- middleware
  * cookieSession - Establish cookie-based sessions.
  * body-parser - Parse HTTP request body.
  * morgan - HTTP request logger.
  * serve-favicon - Serve a favicon.
  * serve-static - Serve static files.
  
add a little more detail about what it does.

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
