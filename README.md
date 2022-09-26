## JR Kim A3

https://webware-a3-jrkim.herokuapp.com/

Deployment in heroku.
Small todo app with github login feature (OAuth 2.0) where it stores tasks so it saves todo tasks to each user.
I chose OAuth 2.0 for authentication since github used it and there were many established documents and example for it.
Usage of bootstrap was easy with the same reason.
Used deleteOne method meaning it requires to only have one row with specific task value.
Lighthoue score was okay with having low SEO score, but rest were okay.
For middleware
- cookie-parser: secret a string or array used for signing cookies
- path: define path and modify
- http-errors: error handling
- passport: sign-in options
- morgan: logging HTTP request and errors
- mongoose: mongoDB framework


## Technical Achievements
- **Authentication**: I used OAuth authentication to be able to login
- **Entry function**: A form entry function to post, get, and delete data 
- **Server**: Server to store user and todo task data
- **Middleware**: Middleware includes cookie-parser, path, http-errors, passport, and morgan
- **EJS**: offers more dynamic and freedom by using ejs in place of html
- **Future proof**: clear organization and structure for website to expand easily

### Design/Evaluation Achievements
**Design Achievement 1**: I followed the following tips from the W3C 
- Include clear lable for each items such as task, date, description.
- Ensure sufficient contrast between elements and background by using lavender, white, black
- Wide testing pool to see if wide verity of users can use the website without external instruction