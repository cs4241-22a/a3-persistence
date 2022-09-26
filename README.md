## Bookshelf Web App


Glitch: https://a3-neha-kuchipudi.glitch.me/



- Application Goal: This web app acts as a vitural bookshelf for users. Users can login, access/view books on their own booksheld and add/edit/delete books on their bookshelf. The app helps them keep track of how many more pages they need to read in the book as they can enter the total pages and pages read in the book. They can update the book as they read by editing it. If they finish a book they can delete it off the bookshelf. 
- Challenges: The main challenges I faced when creating the app was making the cookies store book data attached to a certain user. The cookies would not store the UserID. I also faced a challenge with the app only showing data from MongoDB in the preview pane of Glitch but not in the actual link. 
- Authentication Strategy: I collected the input from the username and password box and upon click of the login button I stored the input and checked if the combination matched a combination in the user collection.
- CSS Framework: I used Bootstrap for a framework, I thought it looked the best and was a responsive framework. The main changes I made to the framework was some font changes and layout changes.
- 5 Express Middleware Packages:
1. Cookie-session: storing username/password information
2. Express.json: Data formatting of books
3. Body-parser: data in HTTP request
4. Express.static: serving express files
5. Cookie-parser: parsing data in cookies
- Flavors of inputs: I used number, text and password flavors for inputs.

@@ -24,10 +23,11 @@ Tech Achievements:
## Technical Achievements
**Tech Achievement 3**: Received 100% on all lighthouse tests required
![image](https://user-images.githubusercontent.com/98354759/192203344-f89d0632-28c5-4e1f-a632-787b4ef0f401.png)
![image](https://user-images.githubusercontent.com/98354759/192300783-7ce72fd9-dc0a-4710-884a-7f7b2ef2260c.png)

### Design/Evaluation Achievements
**Design Achievement 1**: I followed the following 12 tips from the W3C Web Accessibility Initiative:
1. Associate a label with every form control - Labels are used for all of the required form controls (username, password)
2. Identify page language and language changes - Every page HTML page has an English identifier in the code.
3. Don’t use color alone to convey information - For required inputs like the username and password, they are in red and marked with an *.
4. Provide sufficient contrast between foreground and background - Black text is used on a white background for more contrast.
5. Use headings and spacing to group related content - Form inputs and controls are grouped together, headings are used to describe form.
6. Help users avoid and correct mistakes - Example usernames and passwords are under input controls.
7. Include alternative text for images - Book illustration is provided with an alternative text.
8. Use mark-up to convey meaning and structure - Element ID's, types and roles are indicative of what they represent.
9. Use headings to convey meaning and structure - Headings describe what the form does.
10. Provide informative, unique page titles - All pages are given titles that describe the main function of the page.
11. Reflect the reading order in the code order - Code order is in reading order.
12. Ensure that interactive elements are easy to identify - Interactive elements like buttons change appearance based on hover.
