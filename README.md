## To Do List
Eri Kim

https://a2-iekimi.glitch.me

This web application can serve as a To Do List. 
Using the CSS flexbox for the layout, there are three fields where you can add, a todo item, its due date, and a tag. 
When a todo item is created, the table below gets updated with a new row that has five different fields: Status, Todo, Due, Priority, and Tag.
- The priority column is the derived field that is computed based on the given due date and current date. Depending on how many days you have until the due date, the priority would display red, yellow, or green.
- The tag column has five options available, and they are color-coded.
- Once you complete the todo item, you can click the "Done" button to remove the todo item/row.

The page is validated, and met all the requirements as follows:
- Server maintains a dataset with 4 fields related to the application.
- The table shows the dataset residing in the server's memory.
- There is a form functitonality which allows a user to add or delete data items residing in the server's memory.
- When there is new data, the server adds a derived field, which is computed based on the field already existing in the row.
- Used form.
- The page displays all data currently available on the server using a table tag
- The page is validated.
- Used element, id, and class CSS selectors.
- Used CSS flexbox for layout.
- Used font "Baloo 2".


## Technical Achievements
- **Tech Achievement 1**: This web application is a single-page app that provides a form for users to create a todo item and also shows the current state of the server-side data. When a user submits a new item, the server gets the updated dataset and updates the table.

### Design/Evaluation Achievements
- **Design Achievement 1**: Used the think-aloud protocol to obtain feedback on my design. 
1. Last name: Rocha
2. The user was not sure which tag to use if there was no tag related to the todo item she was creating. I added another tag "Ohter" after this to address this issue.
3. N/A
4. I would try to avoid having a lot of texts. What I noticed was that users tend to see the visuals before texts, in this case, they tried to create a todo item before reading the instructions. Also, having a label that says "due date" next to the date field would be helpful.
- **Design Achievement 2**: Used the think-aloud protocol to obtain feedback on my design. 
1. Last name: Theofilou
2. The first text field had a placeholder "Add todo item" instead of "Type todo item" so she did not fill out the field when creating a new todo item. After seeing this, I changed the placeholder and added a bullet point that explains what the first text field is for.
3. "I don't want to read. So I am just going to try things out." 
4. I would try to use more visuals to explain the instructions instead of having texts.a