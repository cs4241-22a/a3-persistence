## CS:GO User Intake Form

Link to website: https://webwarea3.herokuapp.com/

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
- **Design Achievement 1**: I implimented the CRAP (contrast, repetition, alignment, and proximity) principles into my site:

For contrast my site used a vibrant mixed hue background that blended complementary colors like blue and orange to create a unique but appealing visual look to my site. I used rounded white card components from bootstrap for my main content which popped well in contrast with the colorful background. I added black boarders to certain text boxes and cards to really put an emphasis on the important information on the screen. Using contrast I was able to make my cards and textboxes pop without it being to distracting from the overall aesthetic of the site. For Repetition I used the same theme throughout the pages on the site with main color palette being blue, orange, and white. I also used similar geometry for my buttons and cards surround the content of my page. The buttons were all blue with padding when you hovered over them, and the cards were all had rounded corners with a white background. My text box inputs all had similar white backgrounds with rounded corners but changed to a lighter blue when being interacted with. For alignment almost all the content on the sight had a focus on symmetry. In the case of the login and registration screen symmetry was used for the alignment of the text boxes and the buttons. I then aligned all these elements withing a card object which I could move to be centered on the page no matter the screen size of the device viewing the website. This automatic centering helps the cite remain consistent across devices with varying screen resolutions and aspect ratios. As for proximity I made sure that everything was evenly spaced out so that the gaps between elements would remain consistent through out the sites design. In particular I had to put in a quite a bit of effort adding padding or recentering button divs in order to make the spacing look good. I also had to use bootstraps cards and containers features to orient certain elements correctly. Overall, I am happy with the way the website turned out and think I incorporated these design rules well when building my website.  

