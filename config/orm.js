// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require('./connection.js')

// ORM
// =============================================================

class ORMISH {
  constructor (table = 'todo') {
    this.table = table
  }
  // Here our ORM is creating a simple method for performing a query of the entire table.
  // We make use of the callback to ensure that data is returned only once the query is done.
  getTodos (callback, table = this.table) {
    const s = 'SELECT * FROM ' + table

    connection.query(s, function (err, result) {
      if (err) throw err
      callback(result)
    })
  }

  // Here our ORM is creating a simple method for performing a query of a single character in the table.
  // Again, we make use of the callback to grab a specific character from the database.

  deleteTodo (id, callback, table = this.table) {
    const s = 'DELETE FROM ' + table + ' WHERE id=?'

    connection.query(s, [id], function (err, result) {
      if (err) throw err
      callback(result)
    })
  }

  addTodo (todo, callback, table = this.table) {
    const s = 'INSERT INTO ' + table + ' (text) VALUES (?)'
    todo.complete = todo.complete || 0
    connection.query(s, [
      todo.text, todo.complete
    ], function (err, result) {
      if (err) throw err
      callback(result)
    })
  }

  editTodo (todo, callback, table = this.table) {
    const s = 'UPDATE ' + table + ' SET text=? WHERE id=?'

    connection.query(s, [
      todo.text, todo.id
    ], function (err, result) {
      if (err) throw err
      callback(result)
    })
  }
};

module.exports = new ORMISH()
