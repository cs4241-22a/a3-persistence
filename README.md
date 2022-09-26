https://a3-zaq-humphrey.herokuapp.com/

## Shopping List Creator

https://a3-zaq-humphrey.herokuapp.com/

The goal of this project was to be able to make a shopping list for anyone who needs to save their list. The data would be saved in mongodb to keep persistence in between sessions, as well as display the only each user's specific data to them. The server was run using express and middleware, and my html files became handlebar files from project 2. Some challenges I faced was getting the data to upload to mongodb, then properly getting the data back, as well as deleting/modifying the specific pieces of data I wanted. Another challenge was showing data to each specific user. I chose to authenicate by inputting a record into mongodb and seeing if they already had username/password in the database. I tried to do the OAuth for Github, but there was not enough time to try to fully understand it so I kept the login I developed. If the user input a username that did not exist, it would automatically make a new account, and if they put in the correct username but the wrong password, it would tell the user that they input the wrong password. I used water css framework for my login page as I thought it looked nice. I wanted to use water css framework for my main page too, but it did not pass the lighthouse test, so I did not end up implementing it. 1. express.static allowed me to serve static files from ./public, which housed my scripts.js. 2. express.urlencoded parses urlencoded bodies and would only look at requests here the content-type header I would create in scripts.js would match the type. 3. express.json() would automatically parse json requests in my server.improved.js. 4. At line 21, this middleware checks to see if the collection we are connecting to is null, and if it is it will throw an error; If it doesn't throw an error, we properly connected. 5. A custom one I created was for getting the data from mongodb. The middleware would search for data that only had the corresponding username I inputted into the database, then return the user's correct data in an array format.

## Technical Achievements
- **Tech Achievement 2**: I hosted my server on heroku instead of glitch. I felt that it was pretty different from glitch. I used my github account to push from my repository, and although settings up my account for heroku and fixing some minor bugs was tedious, it worked easily once I got past that boundary. I think that it is better than glitch because it is very easy to push my data locally to heroku. 

- **Tech Achievement 3**: I passed all four lighthouse tests and got 100%. The challenge for this section was simply making the minor adjustments that the lighthouse test recommended. The biggest challenge of the lighthouse tests was the SEO section, mostly because it had the most problems with my website. On my computer, I get 100s on all the lighthouse tests. I will post screenshots of this. Other students in the class have tried my website and told me it does not get 100, so I am posting these screenshots.

![image](https://user-images.githubusercontent.com/44264516/192317966-5f9bd53d-5098-4925-8bbc-a5f6eed74ded.png)

![image](https://user-images.githubusercontent.com/44264516/192318465-d83eff37-086d-42d3-bd89-a16cbca3a3c9.png)


