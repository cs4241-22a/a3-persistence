## Samara's To Do List

### Author: Samara Holmes

### Glitch Link: <https://glitch.com/~a3-holmes1000>

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

**Goal** To create a to-do list that makes use of a server using Express, a results functionality for a logged in user, a form/entry functionality with options to add, modify, and delete, and data storage using mongodb.

- challenges you faced in realizing the application
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)
- I used the Pico template at <https://picocss.com/>. I thought it had a good use of colors and kept the design very sleek.
  - include any modifications to the CSS framework you made via custom CSS you authored
- The Expresss middleware packages I use are: body-parser(), express-session(), serve-static(), morgan(), response-time(), cookie-parser(), and an attempt with passport().
Body-parser parses incoming request bodies before handlers (I mainly used bodyparser.json()).
Express-session creates a session.
Cookie-parser parses the cookie header and populates req.cookies with an object.
Serve-static serves files from within a root directory depending on what url is requested. It sends a 404 response when a file isn't found.
Morgan prints the HTTP request to the console.
Response-time records the HTTP response time. Passport is used for the OAuth authentication strategy.

## Technical Achievements

- **Lighthouse tests**: Achieved 100% in all four lighthouse tests including, performance, accessibility, best practices, and SEO.

### Design/Evaluation Achievements

- **Site accessibility**: Used the following tips for writing, designing, and development from the W3C:

1. Using headings to convey meaning and structure: There are multiple headings used in the main page, starting with the title of the application, going down to instructions, task entry, and the lists.
2. Meaningful link text: Has a footer at the bottom of the main content page that goes to my website.
3. Provide clear instructions: Provides clear bulleted instructions at the top of the main page.
4. Keep content clear and concise: The instructions are bulleted to be short and concise (they were written as a paragraph before).
5. Sufficient contrast between foreground and background: Chose a well formatted template and updated the elements as seen necessary to provide better contrast (ex. creating a white outline around the buttons).
6. Don't use color alone to convey information: Used an asterisk in addition to color to indicate the required form fields.
7. Interactive elements are easy to identify: The website link at the bottom and the buttons are easy to identify. The style and color and used consistently for each button.
8. Form elements have clearly associated labels: The elements of the form have clearly associated labels along with colors matching the theme to show they are required.
9. Provide easily identifiable feedback: Provides colored error message for login info if incorrect. Also indicates when a field hasn't been filled out on the main page.
10. Idenify page language: Language indicated at the top of both handlebars pages.
11. Associate a label with every form control: Every input in the form has a label associated with it.
12. Reflect the reading order in the code order: The order of the elements in the code are the same in the pages.

- **Using the CRAP principles**:

1. Contrast: The principle of contrast is visually important in a page and allows the reader to have a desire towards the page. For contrast in my application, I think it was important to make sure that the fields of the form get the most emphasis, along with the buttons. Though the title is a big part of the application page, I made sure that the task entry section had the most emphasis (bolder than the title). I also emphasized that the application is a to-do list, by repeatedly coloring the phrase ‘To-Do’ blue. This created contrast with the rest of the page because the main amount of text is in white. I also contrasted the to-do list elements by using a different font. The headers (minus the instructions) are all in a separate font from the standard text. To also emphasize the required parts of the form, I colored the text blue for those required entries and I made sure to write a little note saying the “required fields are in blue and marked with an *”.
2. Repetition: The principle of repetition relates to the repetition of objects or designs throughout a page. For my web application, I used the same color, font, and symbol repeatedly throughout my site. To make this easier, I chose a CSS styling template to use which provided most of the design. However, to improve upon this, I used Google Fonts to select a font for the To-Do list headers specifically. I used the font in the title of the application, the header for task entry, the header for the to-do list, and the header for the completed to-do list. I also selected the color blue to repeat throughout the website. Along with the color, I used a checkmark character to repeat in most of the headers as well. I colored these blue to match the theme. Lastly, I kept the alignment consistent throughout the site, but that will be discussed more in the next section.
3. Alignment: The principle of alignment relates to how you place items on the page. “Every item should have a visual connection with something else on the page.” I aligned my site to the left and gave it some padding to develop the “invisible line”. This “invisible line” makes the connection between the text and the page stronger because of the edge it follows. Previously, I had it centered because that was easier, however, after reading the Non-Designer’s Design Book, I learned that centering creates a less strong, “soft” edge. I made sure to align everything to the left to create a path for users to follow. It should be straightforward and go from top to bottom, just like a to-do list. I think that if I had used multiple alignments, or used just centering, the path for the user to follow would be less clear and would create a weak looking design.
4. Proximity: The principle of proximity relates to how you group items together on your application. Items that are related to each other, should be close in proximity. I made sure to keep the instructions, task entry, to-do list, completed to-do list, and footer separate from each other. To emphasize the sections, I also used the "hr /" tag to create a line that separates the sections out. I used two of those tags, one for after the task entry, and one for after the to-do list. Something else that helped me in keeping the proximity between sections was keeping the code in order with how objects show up on the page and also using headers. Keeping the code in logical reading order helps with the logical progression of the piece and the path followed. Using headers, keeps the web page organized and acts as titles to the groups of content I created.
