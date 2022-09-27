Trang Pham


## Glitch Site
https://a3-trangpham68.glitch.me/

## My Todo List
A very basic to do list with field for user to add a task name and due date.

Using Table layout to store all the database of all the task with task name,dates for due dates and date till as well as delete option for each row.

A server is created using Express for teh assignment
There are bugs to show proper Result information. The delete button doesn't seems to work.
For the Add task button, although it is throwing 503 error, whenever i reload the page and re log in, the new task is indeed added to the database.
The information is in the database, however the actual adding action seems to be throwing out error.

Regarding the Middleware, I am using server-static, cookie-session, compression, helmet and passport.
Persistant data storage in mongodb
Regarding CSS Framework, I am using the Sakura framework sinc eit's provide a minimal yet still very popping and clean look to the app.

HTML input tag: the app using form firled with text to get input
the data in the table is specifically for the authentificaed user.

## Technical Achievements
- **Tech Achievement 1**:  The app support OAuth authentification. User can log in using their Github account. (using passport)
