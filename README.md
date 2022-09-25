## Do It!
![Do it Logo](/readmeImages/doitmain_resized.png)

Website link: http://a3-charlie-roberts.glitch.me


- Do It! is a simple ToDo application.
- Adding a task is simple, add a non-empty task name, select a deadline (optional) and select a category.
- To Edit press the edit button in the task list, the tasks details are automatically copied to the top
- To Delete press the delete botton in the task list
- Credentials for normal user login: TODO
  I did not make a method for creating new users through the website, as I felt it was redundent and could be done easily.

- I utilized github Authentication using passport, as well as a custom authentication that uses [salt and hash](https://www.pingidentity.com/en/resources/blog/post/encryption-vs-hashing-vs-salting.html#:~:text=Hashing%20is%20a%20one%2Dway%20process%20that%20converts%20a%20password,to%20obfuscate%20the%20actual%20password.). I really wanted to
learn how developers implement Oauth2 and decided it was a challege I would face sooner or later, so I decided why not. It was difficult to get it working, specially because I was
getting confused with callbacks vs promises. Another challenge I faced was creating a seamless integration between the two login strategies, which I managed using a custom Mongoose User model.

- I used tailwind for my CSS framework, as it integrates seamlessly with html (in the sense I do not need to create a seperate CSS file, they are auto-generated), classes are pre-designed and I simply need to
assign a html element with the respective styling class I want. 
  - I added a custom layout for the task list, this is because the elements were created dynamically using js, and instead of applying individual classes as tailwind intended, I had a custom class with mutiple customizations
- The express middleware packages I used were:
    - passport: Middleware that is used to authenticate requests, paricular routes may be protected such as the main/index/homepage, that users must be logged in to view, I used the passport-github2 strategy which redirects users to github and then to a callback in my server
        - used passport-github2 and local strategy to authenticate users, this was integrated with my Mongoose model to ensure seamless integration between the two methods
    - express-session: I used this middleware to create sessions between the clients and the server, this enables users to be auto-logged in given that the session is still valid (set expire to 1 hr)
    - body-parser: Processes data sent in request body, i used it to parse urlencoded requests from client
    - connect-ensure-login: This middleware ensures that the client is signed in before accessing any vital documents throught the time the client is connected, it works with passport and express-session to check if a user is currently connected before handling the request
    - express-static: to provide static files in the public directory, which automatically configures MIME types and is super convinent to provide imgs,css and js.

- Although all the information is sent from the server to client (including derived field), they are not directly displayed as it would not make sense. Instead, they are used in more creative ways, for example task_urgency is represented as the color of due date, taskCategory is used as the background color for the taskName.



## Technical Achievements
- **Tech Achievement 1**: Implement OAuth authentication via Github strategy as well as a custom login method that utilizes salts and hashes, which itegrates seamlessly using a Mongoose User model. This was specially difficult due to the lack of proper documentation for the Github-strategy as well as lack of proper intro-usage examples
- **Tech Achievement 2**: 100% on all four lighthouse tests, this was not entirely intended, in the sense I tested it at the end and fixed the reccomendations which gave me a total 100% score.
![Lighthouse test report](/readmeImages/lighthouse_report_scaled.png)
[Link to full image](/readmeImages/lighthouse_report.png)

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed majority of the design guidelines given by the [W3C Web Accessibility Initiative](https://www.w3.org/WAI/tips/developing/)
    - Associate a label with every form control: Added a label for any input source, so that screen readers may access the text
    - Include alternative text for images: Added alt text for each image, so that screen readers may access the text, and incase image is not loaded
    - Identify page language and language changes: Added html lang tags in every page 
    - Use mark-up to convey meaning and structure: Added most-suitable tag for each purpose
    - Reflect the reading order in the code order: Added titles before adding image, otherwise the text is paired/grouped with the image
    - Write code that adapts to the user’s technology: tailwind takes care of most of this, but I added content-filters to size elements correctly.
    - Avoid CAPTCHA where possible: All CAPTCHA's avoided
- **Design Achievement 2**: 
    - I tried to use a consitent color pattern throughout the development, and designed my own custom logo using adobe.create. (5 points maybe?)
    - Used fonts from google, namely: Share Tech Mono for index and Barlow for login page.
