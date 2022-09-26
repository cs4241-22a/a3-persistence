## No Stock Garage
# Link: https://a3-arman-saduakas.glitch.me #

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

The goal of this application is to keep track of custom car parts that a user might order.
Definitely one of the challenges that I've faced was the github authentication. Since developing on Glitch, my user id sometime would just read as null because I would constantly authenticate and de-authenticate. Another challenge was working with different inputs inside of my table div and sending the over to the server, and unpacking them on the server too. Dealing with a custom CSS template that I've found, learning how it works and customizing it took me quite a while too.
I chose github as my authentication challenges, just because I didn't want to provide a dummy account (lol).
For my CSS framework, I used terminalize.css, which was created by a github user named pabletos. Even though it's not very user-friendly accessibility-wise, I still like how it looks and wanted to test out this design.
For the custom CSS, I've changed some pannels to have no borders and changed their flexbox layouts. Also, I've extended this style to apply to links and created new classes for more flexbox availability.
My middlewares include:
  - Serving static files
  - Serving JSON files
  - Custom middleware for getting a user by id
  - Custom middleware to check for mongodb connection
  - Helmet middleware
  - Compression middleware

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy
- **Tech Achievement 2**: I've gotten 100% on all of my lighthouse tests
