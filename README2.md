
# **INSTRUCTIONS**

The goal of this exercise is to create the foundation of our Todo model and implement functionality to retrieve all Todos from the database using Knex.

## Todo Model Set Up

* [ ] Create a `models` folder in the root of your app
* [ ] Move the `/config/orm.js` to your new `/models` folder
* [ ] Change the connection dependency variable name to `knex` (this is optional but is good practice)
* [ ] Rename the class name to `Todo` and make sure to rename all references to that class name
* [ ] Add a scaffold to seperate your new code from your old code (optional). See example:

```javascript
// BEGIN NEW CODE

// END NEW CODE

// The old code will be underneath
```

## Now Let's Code

### At this point you should have the Knex.js [documentation](https://knexjs.org/#Builder) and or [cheatsheet](https://devhints.io/knex) open for reference

* [ ] In `/models/todo.js` implement a `findAll` function that selects all todos from the `'todo'` table.
* [ ] In your `/routes/api-routes.js` modify the dependencies to pull in your new `models/todo.js` file.
* [ ] Modify the GET route for getting all todos to make it use your Todo model.

### Time to test

* [ ] Run `npm start` in your terminal. If there are any issues **ASK FOR HELP** if you can't figure out what's going on.
* [ ] If there are no issues, go to `localhost:8080` in your browser
* [ ] If you see your seeded todos, you're good!
* [ ] If not, **ASK FOR HELP**

If your first method is working, CONGRATS, now move on to the next function!

* [ ] In `/models/todo.js` implement a `create` function that inserts a todo into the `'todo'` table.
* [ ] In your `/routes/api-routes.js` modify the POST route for saving a new todo to make it use your Todo model.
* [ ] Test your refactored functionality by trying to enter a new Todo from the browser.

### W00T Let's Move On
