Erg Workout Logbook
http://a3-ryjdillon.glitch.me

The goal of the application is to record ergometer workouts for a given user, including the date
that they completed the workout, the amount of time rowed, and the total meters rowed. This would 
allow the user to see their progress and how they get faster over time.

I faced many, many challenges in this application. Although it doesn't really work, it did almost work at one
point before I changed something and then spent a couple hours trying to figure out what I changed. The password implementation was the 
hardest part, along with getting the different buttons to post the correct page.

I chose an authentication strategy that was simply storing the usernames and passwords in the mongo database to search for 
existing users, and just creating a new user if the username did not exist. 

I used the CSS picnic framework because I enjoyed the simplicity and cleanliness of it. 

the Express middleware packages that I used were cookie-session, express.json, and body-parser.