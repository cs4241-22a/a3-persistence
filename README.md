# Inkboard
By Cameron Jacobson

Website link: http://157.230.2.81:443/


Inkboard is a synced Canvas for people to work together and contribute to a collaborative drawing. Users can log in draw strokes with
custom colors and thickness. Users can also clear the canvas of strokes that they have made. The server will differentiate
which strokes were added by which user and update the database accordingly.

### CSS Framework
I used the MUI css framework because I wanted to use the material design specification. MUI was much simpler than the
official Material design components, and my website didn't have a terribly complex.

I also used custom css that I had built up over project 1 and 2. A lot of custom css was used in each page of this
application to ensure components lined up properly. Here are some examples:
- Using flexbox to arange components on the screen
- Limiting scrolling to the canvas instead of the entire page
- Ensuring the web app takes up the entire screen. No more and no less.
- General tweaks to margins and padding to make components fit well together

### Express Middleware
I used the following pieces of middlewear:
- **morgan**: Used for general server logging
- **passport**: Used as an authenticator for users logging in
- **passport-local**: Specific method for logging users in. I used this method because it was the simplest to implement.
- **express-session**: Used for storing login sessions (automatically through passport)
- **express.json**: Used to make parsing json from the client simpler


I will be the first to admit I went pretty light on the middlewear packages. A lot of these packages are dependencies,
but I decided that since I had planned a fairly ambitious app, I should focus on getting the basic functionality working
over using a variety of middlewear.


## Technical Achievements
- **Persistent Database**: A mongoDB atlas database that persistently stores the canvas and user accounts
- **Alternative Host**: The website is hosted on a digitalocean droplet

### Design/Evaluation Achievements
- **Semantic HTML**: The login form uses semantic HTML to allow for third-party tools to interact with it
- **Meta tags**: Added meta tags specifying the websites screen fit for search engine optimization
- **Design elements**
  - Login page
    - **Alignment and emphasis**: The login prompts are right-aligned in a prominent centered div. This ensures that
they look organized without being on the edge of the screen.
  - Home screen (canvas)
    - **Contrast**: There is contrast between the controls/website title and the canvas
    - **Emphasis**: The borders of the canvas are additionally emphasized with a dropshadow
    - **Emphasis**: The focal point of this page is the canvas, so it's given ample room relative to everything else
    - **Grouping**: The side-bar contains a group of options pertaining to the canvas and a separate sign out button
  To indicate that it is the one button that will take the user to a different page
