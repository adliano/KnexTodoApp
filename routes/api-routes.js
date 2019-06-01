// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
//var orm = require('../config/orm.js')
let orm = require('../models/todo')

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the todos
  app.get('/api/todos', function (req, res) {
    // orm.getTodos(function (results) {
    //   res.json(results)
    // })
    orm.findAll().then(results => res.json(results));
  })

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post('/api/todos', function (req, res) {
    // console.log(req.body)
    // orm.addTodo(req.body, function (results) {
    //   res.json(results)
    // })
    console.log(req.body);
    orm.create(req.body).then(results => {
      console.log('-'.repeat(50));
      console.log(`TODO create()
      ${results}`);
      console.log('-'.repeat(50));

      res.json(results);
    })
  })

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete('/api/todos/:id', function (req, res) {
    orm.deleteTodo(req.params.id, function (results) {
      res.json(results)
    })
  })

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put('/api/todos', function (req, res) {
    orm.editTodo(req.body, function (results) {
      res.json(results)
    })
  })
}
