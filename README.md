Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===
Cooper Dean
http://a3-dooober.glitch.me

## Custom Pokemon v2
This application allows users to create a pokemon by giving it a name, description, and types. The server then generates the pokemon's weaknesses, resistances, and immunities and returns all of the user's pokemon in a table.

I faced many challenges in creating this application due to being very new to MongoDB, Express, and JS in its entirety. My biggest hurdles were attempting to set up the database and figuring out how promises work.

I chose to create a login page that creates an account when submitting a new username, because it was the easiest.

I used UI Kit for my CSS framework since I wanted to write as little CSS as possible. This proved to be difficult to learn as aligning elements using this framework is not as easy as it seems. My only modification was adding one CSS rule that created strike-through text when hovering over a table row.

Express Middleware:
- cookie-session -> Used to handle all of the cookies I needed
- helmet -> Used for increased security

