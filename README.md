## Qui Nguyen 

**Glitch link:** https://a3-quinguyen-dev-h652h.ondigitalocean.app/login/

## .moonwatch

This project is a multi-paged, persistent task manager that requires users to login through GitHub OAuth. There is an option to enter an email and password but be weary as I did not program its functionality. To login, click on the GitHub icon on the bottom of the form. Once you login to GitHub, you can add a new task through the **Add** button. After you fill out the information, you can hit submit and see your task get created. You can remove the task by clicking on the **X** or **edit icon** the task by clicking on the pencil. When editing a task, it will bring you back to the add form where you can modify the information. Though I would have wished to format the date, handlebars was a pain to work with and I just want it to at least show up.

I used Bootstrap 5.2.1 for my CSS template and my website achieves at least 90% on all test. For middlware, I used:
```checkAuthentication```: Custom middleware to check if the user has been authenticated
```express.static```: Used to serve static files and directories 
```passport```: Used for OAuth using the GitHub strategy
```session```: Used for session management when using mongoDB.
```json```: Used to parse request with JSON payloads 

## Technical Achievements

#### Implement OAuth Authentication

Implemented OAuth with the GitHub strategy. I did not create a dummy account and requires the user to have GitHub.

---

#### Server Hosting

Hosted my task manager using Digital Ocean instead of Glitch. The process was pretty easy and D.O. gave me no issues. When I was testing on Glitch, I had an issue with the node version being **extremely** outdated. I am glad that it was not an issue when using the new provider. I see it as way better than using Glitch in all forms.

---

#### Lighthouse Test

## Design Achievements

#### CRAP Principles

For my webpage, I used the CRAP principles to create its design. 

**Contrast**: Even though I used similar colors, I increased the contrast between Bootstraps default dark color and the task color. Additionally, I used bright colors for the badges under the name of the title. When using a form, I made the buttons bright and noticeable. 

**Repetition**: The repetition in my site comes from its layout. For spacing, I used consistent margining such as my-2 or my-4. Additionally, the editing forms are similar in design to the display forms. This makes the user feel comfortable when editing a form of a similar look. I also used the same color palette throughout the site.

**Alignment**: For alignment on my login page, I used a hard right vertical line for the form. When it came to the main page with the past, I used a hard left vertical line for the entry forms and the information displays. 

**Proximity**: For proximity, the most noticeable difference is when it comes to the header and title container of the main page. I separated them using a _justify-content-between_ because the components had no relation to each other. Additionally, I spaced off buttons further away from form input and grouped them together using a div (noticeable on the add form).
