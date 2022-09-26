

# Todo-user
Kaley Du
http://a3-kdu1.glitch.me

A custom to do list for each user


## Summary

To note: The delete and modify functionality only updates on the page if you refresh. Also, sometimes you have to press submit
twice for the table to show up.

The goal of the application was to have a todo list that shows the username, task, duedate, and priority, which each user
having a different username and password and for the information for each user to be saved in mongodb. The challenges I faced
were trying to get the database to return exactly what I wanted, as sometimes I had to figure out a different query, as well
as displaying the information correctly. The login was also a challenge as I had some trouble figuring out how I would make
an account at first. The authentication strategy I used was to take in a username and password and save them in the same
document in the database, and use that to check if the password is correct for the given username. I created a new account
for a new username. I chose this method since it is simplest and makes sense to me. The CSS framework I used was pure, as it
it is minimalist and the site I have does not have to be over the top. I had to change the color of the buttons a little as
the default colors for primary buttons was low contrast.

The five Express middleware packages I used were
- a custom middleware for handling login. It calls next if the login was successful, and redirects back to the login page if it was not
- express.json() for parsing json
- cookie-session to handle sessions
- handlebars to handle going in between pages
- used a middleware to connect to mongodb


##Technical Achievements:
-Got 100 on all four Lighthouse tests
-Deployed project on Heroku
What was better about this was that it was simple to connect it to Github, as glitch was buggy with this. It is also
much faster. A drawback may be it is more complex.

##Design Achievements:
###Contrast 
On the main page, the text size of the titles were larger than the rest of the text to separate it from the rest. It is also
a different color to further emphasize it. It is the first thing your eye is drawn towards. The welcome message on the login page
is also much larger. It tells the user what to do.
The color of the buttons on both pages were a dark blue, which contrasted with the lighter color of the form input fields
and backgrounds in order to put emphasis on them and indicate that it is where you want to click. There is also some
contrast with the forms having a grey background to separate them from the rest of the page. 

###Repetition
I repeated the style and color for the buttons both in the main page and the login page. This gives a consistent look 
and does not imply that the buttons' roles are too different. It also creates a connection between the login page and the main page. I also repeated the style for 
the forms, which also create that connection between pages. The colors are kept mostly the same throughout both pages, and
are kept minimal in order not to be confusing. The heading and grouping of the form boxes for adding and modifying todo items
are similar in order to imply they have similar roles and the way they are used is similar. Also, the font is kept the same througout
the website, which is another way to establish consistency.

###Alignment
All of the elements on both pages are left aligned. This means that there is a strong through line that unifies the look. On the main page,
alignment is used to seperate the groups of elements. The title and table are not aligned exactly with the form input boxes, which signifies 
they are both different sections. The headings for the input boxes and the input boxes being slightly unaligned signify 
these input boxes are related to each other. All three must be filled out to make an entry, 
so this makes sense. The headings describe the input boxes so they move along with them. The buttons underneath them to
submit are also aligned with these input fields as they are also related to these inputs.

###Proximity
On the login page, the input boxes for the username and password are close together since they are related. The
login button, which is also related, is also close but a little further away. The welcome message is further away and stands
on its own. On the main page, the input boxes for each todo item are similarly grouped together, along with the submit button.
There is separation between the groups of input boxes for a new todo item and to modify an old todo item to emphazise their
difference and so they are not mixed up.
for the todo item. The title and table of todo items are further away, and the remove button is seperate from the form in
order to reduce confusion as it serves a different purpose than the buttons in the forms.