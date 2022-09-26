Reagan Brunelle

## Music Playlist Creator

http://a3-reagan-brunelle.glitch.me

Summary: Music Playlist Creator. My project is a pretend music playlist. The user can add songs with specific name, artist, duration, and album, and see the playlist length in minutes on the right after each song. This way the user can know at what point in the playlist a song will play.

- the user can store favorite songs and track the playlist length easily
- I had the most difficulty configuring database persistency but I eventually got it to work even with updating and removing songs
- I used glitch. I could not get heroku to work

HTML/Javascript: note the usage of forms, inputs, labels, buttons, and text fields and cells added through javascript.
- login and registration are kept as separate actions

CSS:
- I used bootstrap since it is well known and likely a safe bet given the simple layout of the project. I did not edit the template as it kept better practices than me, although I preferred the centered look instead.

Express: handlebars, cookie-session, body-parser, mongo
- I used handlebars to separate the login and playlist page views, I used cookie's to save user sessions, and I used body-parser for passing data to the mongo db. 

Persistent DB:
- MongoDB working with users, data storage, editing data, and removing data


## Technical Achievements     *worth 5 points*
- **Tech Achievement 1**: I got a 100% on all 4 lighthouse tests
                            - I had to convert images from pnhg to webp for performance, as well as add meta descriptions for SEO

### Design/Evaluation Achievements  *worth about 4 points*
- **Design Achievement 1**: I followed some of the tips from the W3C Web Accessibility Initiative including:
                              - alt text for images
                              - page language in meta
                              - I used a natural flow of format from submission to results to convey info instead of using colors
                              - update and remove songs buttoms are easy to notice
                              - I used appropriate headings for each form category and table header
                          
