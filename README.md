Assignment 3
===

Due: September 22nd, by 11:59 AM.



Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

---
The project of:
    Andrei Ignatiev:
        alignatiev@wpi.edu

Droplet URL: http://164.90.252.100:3000





## Kurtz's Cars Auction Management Service

I built upon my idea from the second project. The business, Kurtz's Cars has evolved into an auction manager. The website acts as a portal for sellers who wish to show their cars at a hypothetical auction. Once a client creates an accout, they can add, remove, and modify cars that comprise their sellable inventory. Furthermore, users can alter essential data associated with their account. Namely, their name and password. There were many challenges in this project. Overall, it was a slog from start to finish. Difficulties that stood out include synchronizing server actions with mongodb and the subsequent handling of promises that required adding async and await to and into the bodies of functions. I chose to not deal with any fancy authentication strategies and stuck with the email + password combination for simplicity. I also chose to make things easy by implementing a fairly bare bones CSS template. I selected the pure framework. I found that it was easy to include in html, user-friendly, and easy on the eye. Some of the colors, fonts, and dimensions were carried over from the A2 iteration of the website. 

The five middleware packages that were used are listed below: \
    serve-static: load html pages, CSS \
    body-parse: interpret http requests \
    body-parseJSON: interpret JSON data \
    cookie-session: maintain user session upon succesful login \
    env: process environment variables and mongoDB \





## Technical Achievements
- **Tech Achievement 1**: Using a combination of...

I hosted my site on DigitalOcean instead of Glitch. Compared to the latter, it took a long time to set up. Negatives about the service involve the financial aspect and the significant setup needed to get the droplet into working order. I needed to install the necessary software (nodeJS, middleware packages) and copy over all of the code onto the virtual machine. However, on the positive side, you do not have to use your personal IP address for hosting purposes and you have full access to the entire application stack.

### Design/Evaluation Achievements
- **Design Achievement 1**: 

(I followed 6 design tips in the hopes of getting 5 points as opposed to 12 for 10):




I got a family member to evaluate my U/I. He said that the interactive portions of my application were self-explanatory and easy to use. However, he thought that there wasn't enough space between the header and the entry form. Furthermore, he crticized the lack of explanation around my entry submit button that simply read 'go'. I took both of his points of critique into account and made some changes. For the first point, I added some linke breakages to create some space. For the second point, I added a small header above the form that described what the user would be using the input boxes for. 
