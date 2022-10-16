Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template

## Movielist V2

https://a3-edwardclifford.herokuapp.com/

The goal of this application is to create a persistent movie watch list for users. A user will be able to log in, view their list of movies, add to that list, and view details about that movie. 

The largest challenge I faced when implementing the backend was configuring express to recognize my requests and read the request body json objects. It wasn't until I figured out I needed to use middleware to parse the request that I was able to reveal the body contents. This was escpecially difficult because the problem was not apparent, and the body attribute was completely missing from the request object. No errors were thrown and I was unable to log where the body was being recieved or parsed.

My authentication strategy is comparing a plaintext password to a stored plaintext password in the database on the server. If this comparison passes, the cookie session is set to logged in and the user is authenticated for that username. This was the most straightforward system to implement.

I used pure.css for some lightweight styling of components. The app layout is very straightforward and only has 2 sections, list and add. I had already implemented a collapsible in a2, and chose to use that implementation instead of a collapsible provided by a css framework.

Express middleware:
  cookie-session: Allows user to sign in and fetch their movie list. The cookie tracks if a client is logged in and the user id of the logged in account.
  urlencoded: Allows post and get requests to be handled in the URL (all api requests)
  json: Allows client to send json encoded data in the body of the request (used when selecting a movie)
  static: Serves the index.html to the user when they visit the site.
  (custom) edit POST: Function handling list editing. Allows user to add, remove, or move movies in their list. The command and the affected movie is sent in the body of the request.

## Technical Achievements
- **Tech Achievement 2**: Site is hosted on heroku. The advantage is automatic deployment of a github branch, so anytime I push to main, the app pulls down the change and redeploys. Only issue I had was configuring PORT to accept a congfig string instead of a declared value.
- **Tech Acievement 3**: Site hits 100 in all lighthouse values. Performance right now hovers around 99-100, but it was consistently 100 before I added the accessibility labels required to lift accessibility to 100. The performance rating seems somewhat arbitrary and based on system performance.

![image](https://user-images.githubusercontent.com/36415841/195995371-a268c01c-9450-4516-b4ec-bc8dc287556e.png)

Also, following lighthouse suggestions to improve load time by 48ms actually slowed down the site more, so I struggle with this metric being 99 not 100. Maybe worth 4/5?

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
