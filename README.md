
## Persistent Todo-List

Links:

-http://a3-tobias-mack.glitch.me/

-https://a3-tobias-mack.onrender.com


The third assignment was meant to build a fullstack web application. Therefore you can create and login in an account. You can not just persist data, but also alter data (persist the altered data) and delete data from the mongo database. 

- the goal of the application is to always have access to your personal todo list, that never looses data
- the most challenging parts were setting up the cookies and make the deploying of the website.
- for authentication i built my own persisted login data scheme, although i know it is not safe to do so in production, but it was the easiest way to implement a login functionality.
- for css i used a template from https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css
  - i added some elements to fine tune the design to my desired needs (described further down at the design part)
- the five Express middleware packages you used and a short (one sentence) summary of what each one does. If you use a custom function for *one* (and one alone) middleware please 
add a little more detail about what it does.
- the five Express middleware packages are:
<ol>
  <li> mongodb for accessing and altering data from the mongo database.
</li>
  <li> body-parser for correctly parsing the JSON body
</li>
  <li> cookie-session for storing the session on the client side, without the need of resources on the server side
</li>
  <li> dotenv to load environment vars from a .env file
</li>
  <li> ejs for a simple implementation of server side rendering
</li>
</ol> 

## Technical Achievements
- **Authentication / Authorization**: For simplicity I chose a selfmade approach. The creation and login happen on the same login page. The message gives the user information about how it works. The user can type in his credentials and if the account does not exist yet it is created and lets the user know via a updated message.

- **MongoDB scheme**: To associate the todos with the user, the database uses two collections, where the "todos" collection, has a foreign key in it. So when a user adds, updates or deletes data, the server grabs all the todos with the specified foreign key and renders it.

- **Cookies**: The simple implementation of client side cookies allows the following logical web flow: The application redirects the user to the main page if the login page is called. If the user is not yet logged in and tries to access the main page, it redirects to the login page. 

- **Hosting on Render**: The process of setting up a project on Render was straight forward and fast. In connection with GitHub, you can easily set up a pipeline for continuous deploys. Once set up, it deploys every single commit to your main branch. The downside of using it with the free plan, is that it takes almost 10min to deploy and much longer to load the site than with glitch. So Glitch is the better option for developing, although most people will develop locally with "real" IDEs.

- **Lighthouse Test**: 3x 100% 1x 92% because not using https.

### Design/Evaluation Achievements
- **W3C Web Accessibility**:  <ol>
  <li>informative, unique page titles: added titles for Login+Mainpage</li>
  <li>Make link text meaningful: the "back to top" link says what it does. </li>
  <li>Provide clear instructions: added messages to give feedback and explain how login works</li>
  <li>Keep content clear and concise: i used a very simple layout with only the needed information, so that there is no overkill</li>
  <li>Provide sufficient contrast between foreground and background: contrast is high through white text color and dark background</li>
  <li>Ensure that interactive elements are easy to identify: inputs, buttons and links change the cursor and give visual feedback</li>
  <li>form elements include clearly associated labels: login - username + pw</li>
  <li>Use headings and spacing to group related content: the todos have more space between them, then between the buttons belonging to each todo.</li>
  <li>Associate a label with every form control: for attribute linked to id of input -> e.g. for="username" </li>
  <li>Identify page language and language changes, e.g. < html lang="en" > </li>
</ol> 

## CRAP Principles
-**Contrast**:

Which element received the most emphasis (contrast) on each page? 
To emphasize the upcoming todos, the contrast is higher than the todo input. The same contrast is used for same elements. In this case, it is the todo object, that always looks the same. To make it even clearer, the buttons are black when focused and therefore the contrast is getting higher. Thus we contrast each element differently to draw the reader's eye into the page. the contrast of the link is lower, thus we are muting the less important element.

-**Repetition**:

What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site? 
To make a clearer look, it was chosen to make the todos indented. Therefore we have a better distinction from the input, and form a bigger unit with all the todos. The font, the input text color, background color, button design and size are always the same. But they are different from each other element! So we have a consistent look with one big headline, following input fields and their buttons. The repitition of the todo units makes it immediately clear that these are part of an organized entity.

-**Alignment**:

How did you use alignment to organize information and/or increase contrast for particular elements. 
The main input was made to be a centered one-liner so that it is easy to see and use. The alignment of the added tasks is different so that one can easily differ between the two. Nothing is placed arbitrarily on the page. Everything belongs to a logical unit which is visually represented. Centering the whole page makes it easier to follow the work flow, where the main input is directly in the beginning. It makes it feel like a simple smartphone application we would use. The layout is actually the same when using the mobile version.


-**Proximity**:

How did you use proximity to organize the visual information on your page? 
Labels and inputs are closer to each other on the Login page. The heading h1 was also visually seperated from the inputs. The message part is also further down to make a logical distinction between them and draw the focus to the inputs. The Login button is nearer to the inputs to make them a logical and visual unit. The physical closeness implies a relationship and thus organizes the page. The user is then able to find everything he/she needs more easily, but focuses on the todos and input first. 
