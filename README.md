## Stock List

My Heroku link: https://stocklist.herokuapp.com

I created a stock watchlist single page application allowing the user to view their portfolio of stocks. They are able to add and remove stocks from their watchlist, modify the number of shares that they own and view the current price of each stock.

The biggest challenge in this project was implementing OAuth authentication. I had to learn how to use passport.js and the GitHub strategy as well as mongoDB to store and verify information.

I used OAuth authentication via the GitHub strategy as well as simple username and password authentication. I chose to use OAuth authentication because it is secure and easy to implement and use for the user. I also used simple username and password authentication because it is a common authentication method and I wanted to make sure that I could implement it.

I used the Bootstrap CSS framework because it allows a high degree of flexibility and customization. I wanted to have lots of control over the styling of my site and Bootstrap allowed me to do that. I modified the CSS framework by adding a darker overall color scheme for the site as well as adding some additional fonts and some miscellaneous other styling changes.

I used the following five Express middleware packages:

- express-session: This package allows me to store session data on the server.
- passport: This package allows me to implement oauth authentication.
- body-parser: This package allows me to parse the body of a request.
- compression: This package allows me to compress response bodies for all requests.
- serve-favicon: This package allows me to serve a custom favicon.

## Technical Achievements

- **OAuth Authentication**: I used OAuth authentication via the GitHub strategy
- **Hosting**: I hosted my site on Heroku
- **Lighthouse**: I got 100% in all four lighthouse tests on the login page. On the main page, all four tests are above 90% as required.

  ![loginPage](https://github.com/npollock1414/a3-persistence/blob/main/lightHouseLogin.png?raw=true)
