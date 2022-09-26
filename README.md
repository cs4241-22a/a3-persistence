## Welcome to Yourspace (a3-persistence)
By Owen Pfannenstiehl

https://glitch.com/edit/#!/a3-persistence-owenpfann
https://a3-persistence-owenpfann.glitch.me/

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- the goal of the application
- challenges you faced in realizing the application
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)
- what CSS framework you used and why
  - include any modifications to the CSS framework you made via custom CSS you authored
- the five Express middleware packages you used and a short (one sentence) summary of what each one does. If you use a custom function for *one* (and one alone) middleware please 
add a little more detail about what it does.

My project is a completely 100% original idea for a social media website called YourSpace.  This
is a website students can use to share their least-favorite songs, like CBat, the Zombie Prom musical soundtrack,
Wonderwall, etc.  I faced a lot of challenges in creating this website.  Notably, I managed to get Github-based 
OAuth working with mongodb and very little else.  I couldn't get the server to switch the webpage it was looking
at no matter what I tried.  Since I didn't get past that, I couldn't verify whether any features on the main page
worked, but the infrastructure is there.  I used GitHub because it was one of the few options I was familar with.
Mongodb was very hard to figure out even though I did in the end because for some reason my UI when I tried to
interact with the databases didn't line up with anyone else's, including the professor, even when I reset everything
and tried again.

The CSS styling template I used for my website had a lot of conflicts since it was so old.  However, I picked it
because it reminded me of those early 2000's sites which was what I was going for.  I also used bootstrap framework
because it easily lets you customize buttons.

My five middleware express packages were:
passport for OAuth
express-static for handling files
connect-ensure-login for verifying when a user is logged in versus logged out
cookie-session to keep track of user information
cookie-parser to keep track of the cookies

## Technical Achievements
-I used OAuth authentication via the GitHub strategy
-I hid my mongodb password using Glitch environment variables
-I managed to get OAuth working with GitHub
-I received 100 in all categories for the lighthouse tests

## Design/Evaluation Achievements
-I made a beautiful image for my website that is completely 100% original totally and not the MySpace logo
edited in MS Paint