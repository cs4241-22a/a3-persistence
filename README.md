## todo list

a3-may-dong.glitch.me

Basic todolist that starts on a login page. If username isn't found in db, makes you a new account. Otherwise will check if password is correct and show you that user's data if it is. Supports adding, editing, and deleting items in the todo list, and updates the db accordingly.
- every user is a document in one collection in my database. fields are _id, username, password, and todolist (an array of objects that has the field iid and title)
- very basic authorization - just checks for a username + password match in db. seemed easiest
- used Pure.css. Originally started with Milligram but that brought down Best Practices, so swapped to another minimal framework. Modified pure-button to be a darker blue so its contrast was high enough with the white text
- middleware packages:
-- serve-favicon: serves favicon
-- compression: compresses http responses
-- helmet: sets http headers for security. had to override contentSecurityPolicy because of my buttons using setAttribute - would've preferred to refactor it and keep contentSecurityPolicy, but I ran out of time
-- cookie-session: sets cookies to keep track of user's _id and if they're authorized
-- custom middleware: redirects unauthorized users to the login page. everything above it that doesn't require authorization (logging in, the login page, etc) doesn't have to go through that middleware

## Technical Achievements
- **Tech Achievement 1**: Achieved 100 in every Lighthouse category
![image](https://user-images.githubusercontent.com/96454091/192310256-2a225ae8-777f-46df-a8b0-1d4747e436fe.png)
![image](https://user-images.githubusercontent.com/96454091/192310454-3ce5ab73-994c-4f00-827d-0a0d9b9d8047.png
