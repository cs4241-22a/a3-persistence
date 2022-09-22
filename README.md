## Click Speed Tower

Mark Renzi
https://a3-mark-renzi.glitch.me

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

I expanded on the idea I had from project two. I built a website that is a self-sorting multiplayer scoreboard that keeps track of the user's click speed. This time,
the user needs to authenticate with Github, protecting others from modifying or deleting their scores. 

- I struggled with the github authentication. I thought that middleware would make each step extremely simple, but as it turns out, learning to use middleware is a
completely unique experience that is not necessarily easier than writing an API from scratch, but it is definitely more streamlined accross middlewares. Once I learned
to use one, the project became easier.
- I used the Bulma CSS framework. I picked it from the list because it seemed to have a clean look and a quick glance proved to be intriguing because of its
extremely modular nature.
- Middleware used:
 - passport, for allowing user authentication through GitHub.
 - serve-favicon, to allow for a much more modular way to host a favicon.
 - express-session, to store user login.
 - compression, to slightly speed up the responses from the server when querying the whole database.
 - custom middleware, can be used to protect chosen paths. I used my middleware to ensure that the user is authenticated when using any route other than the login view or accessing the manifest file.

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy using passport.

- **Tech Achievement 2**: I achieved a lighthouse score of 100 in all 4 categories.
![Lighthouse test](https://cdn.discordapp.com/attachments/121797037942374400/1022421470674173972/Screenshot_105.png)

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
- Provide informative, unique page titles - The main app follows the format "Click Speed Tower" while secondary pages follow the style "Login - Click Speed Tower" or "Login Error - Click Speed Tower"
- Use headings to convey meaning and structure - The heading indicates the purpose of the login page, and the main page heading introduces the main page. To maintain conciseness, the header indicating instructions next to the only paragraph on the page was removed as it was unnecessary.
- Provide clear instructions - The instructions explain exactly how to use the page.
- Keep content clear and concise - The instructions given were brief while still informative. To avoid any confusion, a server-side method was introduced to ensure that the user does not see an interactable button to delete scores that aren't theirs, where it wouldn't work.
- Provide sufficient contrast between foreground and background - The background is a dark green, while the foregroud is a mix of light theme versions of the color palette and white.
- Ensure that interactive elements are easy to identify - The keyboard can select each interactive element, and each interactive element is styled to react to a mouse hover.
- Ensure that form elements include clearly associated labels - The only textarea input box is clearly labeled to indicate a name is required.
- Use headings and spacing to group related content - Current scores and leaderboard scores are color coded similarly as well as grouped together. The intro and instructions are grouped near the top.
- Associate a label with every form control - All buttons are clearly labeled and descriptive. There is further information provided on how to use them near the top.
- Use mark-up to convey meaning and structure - The div tag was avoided whenever possible, instead choosing the semantically correct tags instead.
- Reflect the reading order in the code order - Even where it would have been easier to group my score metrics the way I had in project two, I reorganized them so that it is clear which comes first when displayed on the page, and you don't have to reference the js script to follow along.
- Ensure that all interactive elements are keyboard accessible - Initially buttons added through javascript used the "input" tag for appearance reasons. I was able to use these added buttons with the keyboard and maintain the look if they used the "button" tag and the "delete" class.
