## Everyday Quest

link to website: http://alexzyt.com

This project is designed to help boring people get some fun tasks to do. The client can choose which category of the task, including Life, School, Challenge, and then they will do it. If they do not want to do that, press the "submit" button again, and it will auto generate another task for the client. Clients can also add their costomized tasks into the existing database. The system will tell the client how many tasks have they done, as an achievement.

- challenges you faced in realizing the application <br />
The challenges that I have faced was the OAuth login and server connects to the database.
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable) <br />
I used the OAuth strategy, especially Github strategy, because I want to get a hand on experience with the new trending login strategy, and it sounds cool!
- what CSS framework you used and why <br />
I used the Skeleton framework because it looks very good and it is very easy to implement, just by copying the css file into the project. Furthermore, Skeleton also signiture for its simplicity for a light project. I did not change or overwrite the CSS file.
- the five Express middleware packages you used and a short (one sentence) summary of what each one does. If you use a custom function for *one* (and one alone) middleware please <br />
1. cookieSession - help managing the cookies and encription of the cookies
2. cookie-parser - help Logging the cookies and keep track of cookies in the server
3. passport - source for Github OAuth strategy
4. response-time - keep track of the performance (response time) of the server
5. extractor - self written - extract the data from req.body

Lighthouse scores: <br />
<img width="476" alt="Screen Shot 2022-09-20 at 7 06 59 PM" src="https://user-images.githubusercontent.com/78372456/191380240-a7c214c1-729e-4063-afbb-14e76185630b.png">

## Technical Achievements
- **OAuth**: I used OAuth authentication via the GitHub strategy
- **Web Hosting**: I used combination of Digital Ocean + Go Daddy for this project. The good thing about hosting your website is that you can set your own domain name for your website, and there will definitely be mroe freedom on choosing the kind of server you want, ex. large website cannot rely on glitch. The badd thing about this is that it takes quite amount of time to setup everything and fires your website, plus it costs money (at least some).

## Self-named acheivement (5 pts)
- **Userdata storage**: This application stores all user data on the cloud with mongodb instead of local server. By doing this, the application can handle a large amount of users while reamining a good performance. Data is also safer this way because if the server got stolen or hacked, only by changing the databse clientID and password, I can prevent the leak of personal information. It is challenging because while using the passport, you need to change the method of finding user and extract user information stored to fetching from a different mongodb collection.

### Notes:
- The function modify is in the "I did it" and "I did not" button, which change the field Done into true and false respectivly.
- The Get database and Get UserInfo functions are NOT in real time, for purpose of performance.