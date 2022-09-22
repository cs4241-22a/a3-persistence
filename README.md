## Simple Hike Log

Patrick Salisbury: http://a3-patrick-salisbury.glitch.me

The main goal of this application was to extend my a2 project in a different direction that aligned better with persistent storage. In a2, I used a hike planner that had no user data. The idea here was to make a way for family/friends to be able to view a hike you were doing (I often found myself writing hike plans on sticky notes for family members before leaving early in the am, and I thought this site might be a solution). With the requirements for a3, I decided to adapt this idea into a way to store your past hiking trips in a bit of a logbook of sorts. This way, one can easily remember which mountains they hiked and which they still need to do, even potentially years later.

The most unexpected challenge I faced was likely implementing handlebars to allow incorrect login feedback. This was much more of a pain than I would have expected and I had to redo a ton of stuff.

I chose to implement a simple cookie-session authentication strategy, as the data stored here isn't particularly sensitive and I wouldn't expect someone's hike log getting hacked to be a catastrophe. As a result, I chose the easy option since there was no solid justification to make it more complex.

I selected a CSS framework called milligram. This is a super lightweight framework and I liked the simplistic styling and UI it enabled me to create. The site also looks fantastic on mobile in my opinion.

I did add a small amount of CSS, to enable things like a header background color and github svg icon. I tried to stay consistent with a design example I found using the framework to avoid problems.
![img.png](img.png)

### Middleware

- **express.static**: This middleware serves static files to the client when they are requested from a specific folder. Here I used it for my scripts and CSS.
- **express.json**: This middleware intercepts JSON requests and automatically parses them, saving time.
- **cookie-session**: This middleware establishes a user session through the use of cookies. This was used to login users and serve the correct data to a given user from the database.
- **express.urlencoded**: This middleware is used to parse default form responses for the login page.
- **database connection check (custom)**: This is a custom middleware function that makes sure the database is accessible before continuing. If the database is inaccessible, a 503 error is returned to the client. 
- **client redirection (custom)**: This is a custom middleware function that redirects any user that is not logged in and managed to access the main page back to the login page.








## Technical Achievements
- **Tech Achievement 1**: I achieved 100% on the four lighthouse tests for both of my site pages. Here, I had the most issues with search engine optimizations, with a score originally in the mid 70's. I was able to improve my score by a great deal with specific search engine friendly header tags on my site pages.

### Design/Evaluation Achievements
- **Design Achievement 1**: CRAP principles
- On my pages, I focused areas of contrast onto areas where user interaction takes place. This is useful since the user should never have to feel like they are "lost" on the page, and having the areas that the user will regularly interact with contrast with the background is a good way to make the site easier to use. This can help with accessibility as well, as high contrast can help those that may need a bit more help finding where to interact with the page. On the login and main pages, I highlighted buttons and text input fields with high-contrast colors to make them easier to find at-a-glance. Once the user understands the layout of the page, only these high-contrast input areas are really needed to use the site, so this can help the user more efficiently navigate the page.
- Proximity is everything on most sites. Without associations, everything needs to be labeled to understand the layout of the site, which is an important thing to avoid in clean design. On the login page, the username, password, and submit boxes are all horizontally aligned in close proximity. This makes it second nature to fill out the fields. Imagine how strange it would feel to have the submit button between fields. Even something like an uneven amount of whitespace between username/password and password/login would defy this principle as that uneven proximity would imply that there is no association between the elements. On the main page, proximity between text boxes and their captions allow the user to correctly input data, and the proximity of different sections of the page allows the user to stop and read sections, or simply skip over them easily and go right to the table.
- The key to a clean, simple design is repetition of elements. Here, repetition allows my page to maintain a consistent style and look across the application. Every text element on both pages uses the same font, as any font change would look completely out of place and throw off the entire look of the page. Instead of changing font, one can stress the same font differently, allowing the principle of repetition to survive while still drawing attention to key areas of the text. Along with consistent text, the pages use consistent color in their design. Keeping the color scheme to a simple grayscale with a single standout color allows for repetition of key highlighted elements without a secondary color possibly appearing out of place. Finally, the header uses a consistent layout between both pages, giving a more cohesive feel to the website than if the headers were separate. Even though you are redirected after logging in, the site is still recognizable and familiar from the login page.
- Probably the most important design element incorporated into my page is alignment. Every aspect of the page is following a major line. The most obvious line on the page is likely the left alignment line, where there is a very clear and strong line running down the whole length of the page from the header to the bottom of the table. Most of the elements are aligned with this, and when they are not it is intentional. The GitHub link, on the other hand, is aligned to a softer right edge of the page. This is done to both allow it to stand out, as well as to define a right edge of sorts to the top of the page and balance it out. This balance is important, as the header elements are mostly towards the left side of the page while many other elements stretch the entire length of the page below it. As a result, this right aligned element helps to balance out the whitespace at the top of the page.
