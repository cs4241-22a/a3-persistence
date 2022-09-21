## Fun Game Statistics

Glitch: https://a3-kr0man0va.glitch.me/ 

Goal: create a webpage that allows the user to login using github auth and store game data, such as game name, character name, number of kills, number of assists, number of deaths, and derivered variable kda using mongodb.

Challenges: I struggled a lot to create Git OAuth and deploy my project to a different website. For some reason Heroku doesn't like my code and tries to mess with it. This project was definitely one of the hardest ones...

Authentication: GitHub, because I wanted to learn more about it.

CSS framework: I used Bootstrap so I don't need to create a separate .css file and can use classes to line up elements. For some reason I had a lot fo problems with it, so my website turned out not as good as I expected.

Express middleware: body-parser, compression, helmet, passport, serve-favicon, express-session.

## Technical Achievements
- **Tech Achievement 1**: 
-I used OAuth authentication via the GitHub strategy.

-Achieved a score of 100/100/100/100 in Lighthouse.
(resources/1.png)
(resources/2.png)

### Design/Evaluation Achievements
- **Design Achievement 1**: 
-I followed the following tips from the W3C Web Accessibility Initiative:
1) Provided informative and unique page titles.
2) Used headings to convey meaning and structure.
3) Made link text meaningful.
4) Provided clear instructions.
5) Kept content clear and concise.
6) Provided sufficient contrast between foreground and background.
7) Didn't use color alone to convey information.
8) Ensured that interactive elements are easy to identify.
9) Provided clear and consistent navigation options.
10) Ensured that form elements include clearly associated labels.
11) Used headings and spacing to group related content.
12) Help users to avoid or correct mistakes.

-My site uses the CRAP principles in the Non-Designer's Design Book readings:
1) Proximity states that you group related items together, move them physically close to each other so the related items are seen as one cohesive group. My login page has a header followed by another header with a login link. The last two were grouped together to show that they are related. My main page has a form and all of the lements inside of it are grouped and have a different background to emphasize it.
2) Alignment states that nothing should be placed on the page arbitrarily. Every item should have a visual connection with some thing else on the page. Most of the elements are centered on both login and main page. Some of this is due to proximity principle, which group similar elements together. But it also makes the page content feel more organized, which is the point of alignment.
3) Repetition states that you repeat some aspects of the design throughout the entire piece. In my case I used the same .css so both login and main page had green, black, and white colors with the same font. This allowed me to seemlesly connect both pages together.
4) Contrast states that if two items are not exactly the same, then make them different. In my case I mostly used contrast to highlight headers and make them different from regular text. I also made all of the text have a high contrast in comparsion to the background, so it would be easy to read.
