## Birthday Tracker
=>v2.0

your glitch (or alternative server) link e.g. {tbd}

- The goal of this application was to improve on the Birthday Tracker I developed in the last assignment by adding user authentication and persistent storage. 
- One of the biggest challenges for me in developing this application was understanding how to develop an authentication method. 
- I chose to use the `cookie-session` middleware for my authentication because it seemed easiest to implement. 
- I used the [**modern-css-reset**](https://github.com/hankchizljaw/modern-css-reset) template file that resets certain styles applied by browsers so that I could reuse my CSS from assignment 2. 
- 5 middleware packages used in the server
  - `serve-favicon`: Used to serve the favicon image.
  - `express.static`: Used this built-in middleware to serve files in the public directory.
  - `express.json`: Used this built-in middleware to parse JSON body's of incoming requests.
  - `cookie-session`: Used to establish a cookie session when the user logs in. 
  - Custom middleware function `routeDecider`: Checks to see if cookie session is established, if it is then the request is routed using an authenticated router, if it isn't the request is routed using a non-authenticated router. It also logs to the console the request url and which router was used to route the request. 

## Technical Achievements
- **Tech Achievement 1**: 100% in all 4 lighthouse tests 
  - ![Lighthouse results on the login page for unauthenticated users](path/to/image)
Lighthouse results on the login page for unauthenticated user
 - ![Lighthouse results on the register page for unauthenticated users](path/to/image)
Lighthouse results on the register page for unauthenticated user
 - ![Lighthouse results on the main page for authenticated users](path/to/image)
Lighthouse results on the main page for authenticated user

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
