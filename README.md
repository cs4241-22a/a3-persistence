
## ToDo list XTreme

 http://a3-shanestevenz.glitch.me

Goal:
  -This application serves to provide user a way to keep track of a task list with specified due dates. It includes a Days left field that shows how many days remain to get a given task done.
Challenges:
  -I faced many challenges setting up this project intially. Getting handlebars to work and connecting to the database took a very long time because it would give very generic and vague error messages, making it difficult to troubleshoot
Authentication:
  -used good ol username and password stored in mongodb because it seemed like the most straight forward way to do it.
CSS FrameWork:
  - Handlebars and modern-normalize
Middleware
  - Cookie-session: used to keep track of the username of the current session
  - Serve-static: I used to this serve the static html and js files
  - express.json: Body-parser was broken so i had to use express.json
  - helmet: adds various headers to htttp to help secure it
  - Error handler: i used to this throw errors if the database collection was null
  - timeout: used to to allow timeouts after 15s


## Technical Achievements
- **Clear All Button +2 points**: I added a clear all button which required a little bit of finesse with the deleteMany query. (delete by username, but avoid the username password entry)
- **Light House**: 100% on lighthouse

### Design/Evaluation Achievements
- **Design Achievement 1**: 
