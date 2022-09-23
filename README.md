Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template

## TODO note

http://142.93.245.175/

You can easily make your own username and password for testing, but if you want to use mine its: username: "Nick" password: "12345"

- The goal of the application was a google notes like todo tracker, users can
add todo's, check off todos (modify), and delete todos all of which are reflected in the database after the user completes the action to keep the data persistent
- The biggest challenge I faced was doing more of the processing on the server side. It would have been much more difficult to do a3 like I did a2 where the server does minimal processing and only serves the entire appdata to the webpage to be processed there. In addition to that, all the new technologies introduced in this project also added to the challenge. Setting up my site on Digital Ocean was also a large challenge for me. I expect to have more trouble reaching 90% on all the lighthouse tests, but I was fairly close on my first try.
- To authenticate users, their inputted username is compared to all the usernames in the database to find a match. If a match is found, the password is checked against the entered password to provide entry or not. If the username is not in the database, the user's inputed username and password become a new login in the database. I choose this method because it seemed like the easiest way to be able to add new users
- I used Water.css because it was very easy to implement and extend for my needs and I liked its base layout and color scheme.
  - I added some IDs and classes to format my pages, alter some colors, and add hover behaviors to some buttons.
- The middleware I used was serve-favicon, cookie-session, express.urlencoded, express.json, and a custom one that sends a 503 Service Unavailable Error when mongodb can't be reached.

## Technical Achievements
- **Tech Achievement 2**: I used Digital Ocean to host my site. It gives you a lot more freedom and expects a lot more to set up. I had to do a lot of debugging once uploading my code to Digital Ocean because my code was going from windows to ubuntu and the platform change gave me issues.

