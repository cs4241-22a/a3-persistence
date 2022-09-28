## CS:GO User Intake Form

your glitch (or alternative server) link e.g. http://a3-charlie-roberts.glitch.me
Link to website: https://webwarea3.herokuapp.com/

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- the goal of the application
- challenges you faced in realizing the application
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)
- what CSS framework you used and why
  - include any modifications to the CSS framework you made via custom CSS you authored
- the five Express middleware packages you used and a short (one sentence) summary of what each one does. If you use a custom function for *one* (and one alone) middleware please 
add a little more detail about what it does.

The goal of my application was to create an account based intake form for stundents looking to join an esports team. I made the form specifically for CS:GO player, but it could be modified to fit any game or platform with a few minor tweeks. When building my application I ran into many hurdles with express and getting data to go back and forth properly. I also had an extremely annoying bug where one of my javascript files managed to unexplainably break google light house, but the entire script works fine when put into a script tag instead. My authentication strategy was rather simple. I used a username and password system and would then redirect the user to home.html with there information if there username and passwords were correct. I used bootstrap as my CSS frame work and modified there style template to create a blended hue of red and blue for my background color. 

The five Express middleware packages I used were 

Express body-parser used for parsing the body of html files as well as object from my data base
Express static used express dot static to initialize my public and view directory for use with other Express packages.  
Express get used express get to retrieve information from my database and to get directories for essential files for the site. 
Express post to upload, add, and update information to my database as well as update the site based on values already stored in the database for a given user profile. 
Express JSON used to allow for the parsing of JSON objects that were being sent back and forth from the database and the user input form. 
Express Use to allow for the use and inplimentation of other express middleware packages 



## Technical Achievements
- **Tech Achievement 1**: Instead of Glitch, I hosted my site on Heroku instead
- **Tech Achievement 2**: Got 100% on all google light house tests 

![image](https://user-images.githubusercontent.com/73297412/192719849-218abd23-cdd8-42ff-ab71-a61a9ea8934f.png)


### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
