Mary Barsoum A3: https://a3-test-ui.glitch.me

I really struggled with A3. I recently went to office hours and Noelle walked me through
everything I didn't understand. This is what I was able to complete afterwards.

the goal of my project was to create a daily journal for the user where they can input how they feel daily
I faced many challenges while completing this assignment. I think the biggest part for me was not totally
understanding the client server relationship fom A2. After going to office hours I understood it much better
and was able to tackle express. I also had trouble connecting mongodb a first.

for authentification I first addressed if the use already existed in the system. from there I compared
the password the user inputted and the password saved in the databse.

I implemented multiple console.logs on the user and server side. I could upload entry data to mongodb
but I was unable to filter through the database and output it on the html. hopefully you can see the data entries in
the console logs

## technical achievemnets

- I created a cluster on Mongodb and successfully connected it to my code
- the user is able to create an account and login
- the username and password are checked for the user, stored in mongo and dealt with accordingly
- the user will get navigated to the entry page upon correct login or creation of account
- I used the bodyparser middleware

## design achievements

- there is a form with a cute datetime-local piece and a dropdown menu as well
- I imported bootstrap because it seemed the most versatile. this can be seen in my header color in the css
