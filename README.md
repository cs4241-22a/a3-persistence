## The Note Keeper

glitch (or alternative server) link e.g. http://a3-alexandra-mcfann.glitch.me

For this project, I made a simple list of notes and note titles,
that can be added or deleted. Due to difficulties with the project, same problems
as with A2, I could not figure out a way to alter the data entries, and the website
does not do what I would hope it does, somehow it downloads the data rather
than sending it? However I did the best I could.
No username needed, to log in use password "test"

## Technical Achievements
- log in page reached 100% on all four lighthouse tests, main page
  reached 100% on all but best practices

### Design/Evaluation Achievements
- used middleware to send unauthenticated users to login screen, in the server.js
- used cookie-session to handle sessions
- used express handlebars to handle movement between two pages
- used mongoose to connect to mongodb
- used favicon middleware to give site an icon

- used the picnic css framework, made changes to justifications,
text color, and text box color to make a pretty, and unified image,
added a background to make the page interesting, and altered h2
font size to differentiate it from h1


-Provide informative, unique page titles
  I gave the titles to the pages names that were descriptive
  of the website and the page
-Use headings to convey meaning and structure
  I gave each part of the website a heading, and in the second page, a subheading.
  The heading in the first page instructs the user to log in, and is a higher font size
  to make it stand out from the other text, and the heading in the main page is a description
  of the page, and there are subheadings over each form, and then text about each form
-Provide clear instructions
  When logging in, if the user uses a wrong password, the message
  tells the user to try to log in again. And the descriptions about the forms in
  the main page are clear.
-Keep content clear and concise
  I made my website with as little text as possible on the screen without making it unclear
  to the user
-Provide sufficient contrast between foreground and background
  I created an interesting background without making it the center of attention, and by using
  a coolors pallet I could get contrassting colors that also work together, so the text is a
  different color that stands out form the other colors
-Ensure that interactive elements are easy to identify
  I created text boxes that have outlines and are a different color than most of the background,
  and the mouse cursor will change as it hovers over it. The submitting buttons are in the 
  basic css framework style, and are different from everything else too
-Ensure that form elements include clearly associated labels
  The labels are right above each form element and are descriptive of what that form is for
-Use headings and spacing to group related content
  Different forms are spaced apart from each other, and the form pieces that are
  related have less space between them 
-Dont use color alone to convey information
  While I use color to help make the website fit together, it does not dictate
  how the user is supposed to interract with the website, and the website does
  not rely on the usage of color
-Associate a label with every form control
  Every part of a form has a visible label and an id that is in code
-Reflect the reading order in the code order
  The page is coded in the order that it is meant to be read in
-Ensure that all interactuve elements are keyboard accessable
  all parts of the form can be accessed by tabbing in and out without disruption
  
-Contrast
  In making parts of the page have contrast with another, while not messing too much 
  with the css framework and while trying to make the website visually pleasing, I had 
  some difficulty. By changing the font sizes for the headers, I could make the top 
  header larger than the other text on the screen, and create subheaders for content 
  as well. The framework doesn’t allow for different fonts for different headers, and 
  it felt like that would be too much change on the framework, so I worked with the 
  font sizes and colors instead. I used a Coolors palette to get some colors that would 
  work well as background colors, and a color that contrasted yet worked well with the 
  rest of the screen as text.

-Repetition
  It is difficult at first to get both contrast and repetition in a webpage when making 
  it look good. By using the same color and font for all the text on the screen, I could 
  ensure it all looks like it belongs together on the same page, and contrasts against 
  the rest of the color palette on the screen. Top headers on both pages are the same 
  size, and both describe the page use. On the main page, subheaders that describe the 
  forms are both the same size, but are smaller than the main header. The text that labels 
  the form inputs are all the same size as well, but are the smallest text pieces on the 
  screen. By keeping pieces of text that perform the same job as the same size, but different 
  from text that does a different job, I create repetition that acts to help my page.

-Alignment
  I align all text to the center, since I don’t have much text on my page, and the text 
  acts as a descriptor for fields for a form. If I were writing a lot of text to a screen, 
  I would put non-header text as left justified. By putting all my text in the middle, I 
  create a better looking page that a user would want to look at for longer, and by having 
  all the text in the middle, the text all looks like it belongs on the same web page. The 
  center justified text also works well with the background I have created for the website, 
  looking like the background is centered on the page rather than just placed randomly.

-Proximity
  I place all items that have similar jobs or apply to the same thing next to each other. In 
  the main page, the pieces to the form that creates a new note are all near each other. Right 
  under the text box for creating a note title is the text box for giving that note content, 
  and then right under that is the submitting button. The next form isn’t directly underneath 
  that form, it is separated by a line break, then a subheader, showing the user that this 
  form is a separate one from the main adding form. The table to display the list of notes is 
  also separated by a line break, so it is clear it is not part of the forms.
