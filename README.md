[assignment 3](https://a3-hyoder.herokuapp.com/)
===

due: September 26nd, noon
(but i was under the impression that when the due date was moved, it was to midnight tonight.
 i notified the professor of this to which he replied "no worries!")

## summary!
zack snyder is not a very good director.
i have not seen all of his films, and i've never seen one i liked very much.
this project aims to determine which films are and aren't directed by zack snyder.
movie title + genre are not case sensitive, but the year of release does matter to determining whether or not zack snyder directed it.
for example, he directed "300" in 2007, but he did not direct a film called "300" in 2006.
get your facts straight.

i had some trouble setting up my edit button in a way that worked properly, but i eventually figured it out
the authentication strategy i used was the passport-github2, because it was the only OAuth method i didn't need to come up with a dummy account for
the CSS framework i used was MVP.css because i liked the way it looked
(plus i could incorporate some of the fun CSS stuff i did for a2 without breaking stuff)
the middleware packages i used were
- passport (for OAuth)
- passport-github2 (for getting github to work with OAuth more easily)
- express-session (i was getting an error that said i needed this installed so i installed it and the error went away)
- body-parser (to simplify parsing contents of body)
- serve-favicon (to easily add favicon to page)

## technical achievements!
- (10pts) oauth authentication with github implemented!
- (05pts) hosted on heroku rather than glitch!
  - the downside: no live text editor updating the site like in glitch, made it annoying if i committed
  - the upside: automatic updates from github and also it ran a lot better.
- (05pts) got 100% on 3 of the 4 lighthouse tests with a 99% on performance due to my "first contentiful paint" score
  (i reached out to the professor regarding this, he said to leave a note indicating it was ok to have a 99)