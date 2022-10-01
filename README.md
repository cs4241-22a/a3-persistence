## Class Data Manager

link: https://a3-sidney-goldinger.glitch.me/

Summary of project:
The goal of this project is to allow individual users to store, edit,
and revisit class data on this website. Creating this application was
incredibly challenging. This was mostly because for a long time, I didn’t
have a good understanding of how .js to .html and how server to .js
communication was supposed to work, and it was only after meeting
with a TA for 40 minutes that I understood how the code was supposed
to work, even if I didn’t fully know how to code it. The learning
curve of figuring that out also created a significant challenge.

The authentication strategy I chose was using usernames and passwords
because it seemed like the simplest solution.
I used bootstrap as a CSS framework because I had heard from friends
that it was a popular framework and a good one to learn. I did not
make many modifications to the framework, as I was satisfied with the
results it provided.
For express middleware, I used body-parser, cookie-session, timeout,
express-slash, and helmet. I used body-parser to read through the class
data input. Cookie-session was also used to create cookies to keep track
of the logged-in user. I used timeout to make sure the http requests
didn’t take too long, as it limits the amount of time they can take.
I used errorhandler, which helps monitor and show errors, to try to
help with development. Finally, I used helmet, which creates default
security headers, to secure the site; even though it isn’t necessary,
I thought it would be good to include. I did not create helmet, but it
was made by a third party; all other middleware I used were created
and are maintained by Express.

Note: Although the “register” button leads to the website having issues, it
does successfully create a new user, and should you go back to login, you can
log in with the registered username and password.

## Technical Achievements

### Design/Evaluation Achievements

- **Design Achievement 1**: I followed 12 tips from W3C:

1. Provide clear instructions: I have very clear instructions describing how to
   delete, edit, and add data.
2. Make link text meaningful: I added a link to my family’s website at the
   bottom of the records page, which has the meaningful text “Learn about the
   author and her farm here”.
3. Use headings to convey meaning and structure: On the records page I have
   a title for the whole page and created a clear heading for the directions for
   how to use the website.
4. Associate a label for every form control: I have a label for every form.
5. Provide sufficient contrast between foreground and background: All my text
   colors are black, blue, or a dark gray, and the background is a very light gray.
   Lighthouse thinks that this contrast is sufficient.
6. Form elements include clearly associated labels: The labels for each form
   element are directly to their left or directly above them, making it clear
   what the purpose of each form is.
7. Create designs for different viewport sizes: the viewport uses content=
   “width=device-width”, changing comfortably as the size of the screen changes.
8. Reflect the reading order in the code order: the order of the elements in
   the html code directly corresponds with the order of the elements on the webpage.
9. Keep content clear and concise: the description and titles have short,
   to-the-point sentences and clearly describe exactly what needs to be done
   for the website to function properly.
10. Identify page language: <html lang=“en”> is on each html page, clearly
    identifying the language.
11. Provide informative, unique page titles: the page title for my login page
    is “Class Records Data Website Login”; the page title for the data entry
    page is “Class Records Data Interaction”.
12. Include alternative text for images: There is a simple agenda image on
    the records page of the website, which has an alt=“Simple image of an agenda
    book”.

- **Design Achievement 2**: I used the CRAP principles in the following ways:

Contrast:
My website implemented contrast to make the most important elements stand out
and make the page appear less muted and more interesting. The titles on both
the login and the data entry/view page are both a big, bright blue in a bold
font. No other text in the website is anywhere near this big or bold, allowing
users’ attention to be easily drawn to it. On the data entry page, the
“DIRECTIONS” header is also in a bold font, although slightly smaller,
allowing attention to be drawn to it as well but not taking too much away
from the page’s header a short distance above it. There is also spacing
between different elements on the pages, such as between the login and register
sections of the introduction page, and between the data and the logout button
on the data entry/view page.

Repetition:
My website used repetition for a cohesive and intuitive look and feel. On both
pages of the website, the title of the page was the same color, font, and
size, a bold bright blue at the top of the page. Nothing else in the website
was this bold or big, making this particular type of text stand out as the
title. I also used the same calm gray shade on all pages, making the website
look like it is cohesive. The font throughout the website is also consistent
throughout as to not give the jarring look of having large visual changes in
the same page or website. Finally, the vast majority of the text on all of the
pages is the same dark gray, also contributing to the cohesiveness.

Alignment:
My website uses alignment to make a clean and cohesive look and feel. Most of
the text/data entry/data visuals are directly on the left side of the screen,
allowing the website to look very cohesive. It also allows everything to line
up together so that the website looks more cohesive. For example, the name
and password entry titles are directly above their buttons on the left side
of the screen, making it very clear which entry bar is meant for the username
and which is meant for the password. In the data management page, the
“DIRECTIONS” header is also left-aligned directly above the directions,
allowing for the user to easily understand what it is referring to. This also
contributes to the cohesiveness of the site by matching the rest of the text
and the title.

Proximity:
My website used proximity to make related pieces of the website look and feel
related to the user. For example, on the login page, the title is separated
from the login entry and button, which is also separated from the register
entry and button. This separation allows the users to easily direct themselves
to the part of the page that they need to interact with, without cluttering
their view by keeping the other parts of the page too close by. I have done a
similar thing on the data management page, where the data entry/data list is
significantly separated from the logout button. This allows the page to have
more of a comfortably spaced feel, rather than look uncomfortably clustered,
and it allows the logout button to stay out of the user’s mind and view until
they decide to utilize it.
