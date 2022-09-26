## Timer

https://timer.axpdsp.org

This project implements a timer that multiple people can use to compete against
each other. Once a user is logged in, the timer is started either by clicking a
button, or automatically based on accelerometer readings. Once the timing is
complete, the user may save their time to the database. Saved times can be
deleted by clicking on them. There are initially no user accounts, but
attempting to log in to an unused account will set the password the first time
it is used. I used a password pased authentication strategy because it was the
simplest to implement, as other aspects of the project took a great deal of
time. I used Chakra-UI as my component library.

My five express middleware were:
- Static files
- Log time for each request
- Body parser
- Session
- Content Security Policu

## Technical Achievements
- **Tech Achievement 1**: I hosted the application on a personal Docker Swarm server.
- **Tech Achievement 2**: I scored 100 on all lighthouse tests.

### Design/Evaluation Achievements
- **Design Achievement 1**: I used a react component library in place of a CSS  component library, making easier to model complex behaviors.
