## To-Do List

Link:

My To-Do List app allows a user to log the tasks they need to complete. The user is able to add, modify, and delete tasks. All data is stored on MongDB, however I was unable to get authentication working. For this project, I am using Express, MongoDB, Node.js, Bootstrap CSS Template, and Express Middleware. The Middlware used is as follows:
- **ejs**: allows for simple rendering of server side for this application
- **dotenv**: allows my application to load environment variables (from .env file)
- **express.static**: serves static assets like HTML files, images, etc.
- **express-urlencoded**: parses incoming requests within URL-encoded payloads

As mentioned above, I chose the Bootstrap CSS template as it seemed to be one of the most popular and was very simple in design. Overall, I would say it was a good introduction to CSS templates. The only modifications I made were very slight by adding two margins (title and items and then buttons).Clearly, the biggest challenge I found in developing this application was user authentication as I was unable to implement it.

## Technical Achievements
- **Tech Achievement 1**: I hosted my site on Heroku as I do not enjoy the Glitch editor overall. I found Heroku easier to upload my code from VS Code than it is to Glitch.

### Design/Evaluation Achievements
- **Design Achievement 1**: I made my site accessible by using the resources and hints from the W3C. The 12 I focused on were:
    - **Use of headings to organize content**: I utilized headings for the entire list as well as for the backlog of tasks the user still had on their list.
    - **Provide clear instructions**: I provided clear instructions to the user by placing a hint/directions in the text box for where they should input their task.
    - **Contrast between foreground and background**: I made sure there was good contrast between the background, the to-do list area, and the to-do task.
    - **Don't use color alone to convey information**: In my confirm and cancel buttons in edit mode, I used both colors and text to indicate what each button did.
    - **Interactive elements are easy to identify**: I made it so when a user hovered over an interactive element, their cursor would change (pointer, text identifier, etc) The buttons' colors also adjusted slightly when hovered over (had a "hover state").
    - **Identify page language**: I identified the language as English at the top of my HTML files.
    - **Help users avoid mistakes**: I helped users avoid mistakes by providing an example of what a possible task meant.
    - **Reflect the reading order in the code order**: The reading order of the page is reflected in the order in which it is coded.
    - **Provide meaning for non-standard interactive elements**: I provided meaning for my non-standard elements by using icons/text to indicate their use.
    - **Form elements include clearly associated labels**: Every element in the form had very clearl labels for their use.
    - **Use heading and spacing to group related content**: There is a heading for every type of content as well as logical spacing.
    - **Add text to accompany icons**: There is text along with icons (edit and cancel buttons in edit mode).

- **Design Achievement 2**: CRAP principles in the Non-Designer's Design Book:
    - **1**: My site utilized contrast on each page intentionally. My site technically had two pages, both the To Do List page as well as the To Do List Edit page, however they were nearly identical. Most of the page was varying shades of black, white, and gray. However, I did utilize color for the edit/remove/confirm/cancel buttons. I used contrast in the form of shadows to differentiate both the input field as well as the different tasks on the user's to do list. This contrast is helpful in aiding a user in seeing these elements as separate from the rest of the webpage. Contrast was also used in terms of the edit/remove/confirm/cancel buttons. The contrast between the red and the green (for non-color blind users) is jarring and easy to tell the differenc between. For color blind users, I made sure that the tones of the green and red (cool versus warm) were different and contrasting to hopefully make it more accessible for them.
    - **2**: My site utilizes proximity very intentionally throughout. I made sure that the "add a task" area and the "to do list" area were separated not only through headings/titles, but also through spacing. All aspects to the "add a task" area (heading, input area, submit button) are appropraitely close together. They are also spread apart from all other areas of the application. All aspects to the "to do list" area (heading, different tasks) are also appropriately close together. Even within each individual task, there is appropriate spacing within as well as outside to differentiate between different tasks. I also made sure to format my to do list area into a proper list, having new items pop up at the bottom of the list. This is very important in helping the user as this is how one would write a list (from top to bottom) so this adds a level of familiarity and habit for the user. 
    
    - **3**: Throughout my site, I was sure to use multiple design elements consistently throughout the web site. One example of this is in my color selection for buttons. I used the same shade of green for the submit button, the edit button, and the confirm button. I also used the same shade of red for both the delete button and the cancel button. This is helpful as the user, when seeing a certain color, will associate a certain type of action with it. For example, in my site's case, when a user sees the shade of green they are used to an element of that color acting as a submitter or a confirmer. In contrast, when a user sees the shade of green they are used to an element of that color acting as a remover or canceller. This is useful as it helps prevent mistakes on the user's part and also helps the user navigate the page quicker.
    - **4**: Throughout my site, I used alignment to organize my information. As mentioned above, I intentionally aligned all possible to do list items on the page to be aligned as a normal, hand-written to do list would. I also was sure to make sure that all of my elements were left-aligned rather than centered on the web page. I know that, in general, left-aligned text is much easier to read than centered text for the user. Throughout my site, I also used contrast intentionally to organize my information. As mentioned above, I was sure to use shadows with elements to increase their contrast and make them "pop off" the page. One example of this is how I used shadows underneath the boxes that contained each individual task on the to do list page. This is useful as it helps to group elements that are meant to be together as well as it helps to make certain items stand out to the user.







