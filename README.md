gabriel camacho

## Secure Todo List!

heroku link: https://powerful-sea-37997.herokuapp.com/

Login and create a list of todo items that only you can see! Very exciting never been done before. Most challenges included figuring out how I wanted to render the data and how to communicate with mongo via mongoose. I chose to do authentication my self and it's not the most secure but it works. I used bootstrap because it's well documented and I've used it before.

middleware used:
lazydebug, a middleware function I wrote that console logs whereever you call it
argon2, for hashing passwords
mongoose, for connecting with the mongoDB server easier
expressRouter, for more routing options
ejs view engine for some server side rendering

CSS Template: Bootstrap

## Technical Achievements

- **Hosting on Heroku**: If you can get to the site from the url, it works
- **100% Lighthouse Test**: All pages score 100% on google lighthouse in the 4 categories

### Design/Evaluation Achievements

- **Design Achievement 1**:
  CRAP Principles:
  contrast - light background with dark and legible text, bright buttons
  repetition - forms are as similar as possible, with predictable placement of inputs and buttons.
  Alignment - did center placement for most items, left aligned the create todo form because it was a bit bigger
  Proximity - Form elements were closer to each other than to other elements, made sure elements had space (margin, padding) and weren't crowded, and were grouped when they belonged together
