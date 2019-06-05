// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies

// =============================================================
var knex = require("../config/connection");

// ORM
// =============================================================

class Todo {
  constructor(table = "todo") {
    this.table = table;
  }
  /**=======================================================
   * = = = = = = = = = = = NEW CODE = = = = = = = = = = = =
   * =======================================================
   */

  /**
   * findAll()
   * This method will display all data from table todo
   */
  findAll() {
    return knex.select("*").from(this.table);
  }

  /**
   * create()
   * @param {json} dataObj
   * insert — .insert(data, [returning])
   * Creates an insert query, taking either a hash of properties to be inserted into the row,
   * or an array of inserts, to be executed as a single insert command.
   * If returning array is passed e.g. ['id', 'title'],
   * it resolves the promise / fulfills the callback with an array of all the added
   * rows with specified columns. It's a shortcut for returning method
   */
  create(dataObj) {
    return knex(this.table).insert(dataObj);
  }

  /*
  del / delete — .del()
  Aliased to del as delete is a reserved word in JavaScript, 
  this method deletes one or more rows, based on other conditions specified 
  in the query. Resolves the promise / fulfills the callback with the number
  of affected rows for the query.

  knex('accounts')
   .where('activated', false)
   .del()
  */

  /**
   * destroy()
   * @param {int} idNumber
   */
  destroy(idNumber) {
    return knex(this.table)
      .where("id", idNumber)
      .del();
  }
  /**
   * @method update(idNumber, objData)
   * @param {int} idNumber
   * @param {json} objData
   */
  update(idNumber, objData) {
    return knex(this.table)
      .where("id", idNumber)
      .update(objData);
  }

  /**=======================================================
   * ::::::::::::::::: END OF NEW CODE ::::::::::::::::::::::
   * ========================================================
   */
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  /**
   * **************** OLD CODE *******************
   */
  // Here our ORM is creating a simple method for performing a query of the entire table.
  // We make use of the callback to ensure that data is returned only once the query is done.
  getTodos(callback, table = this.table) {
    const s = "SELECT * FROM " + table;

    knex.query(s, function(err, result) {
      if (err) throw err;
      callback(result);
    });
  }

  // Here our ORM is creating a simple method for performing a query of a single character in the table.
  // Again, we make use of the callback to grab a specific character from the database.

  deleteTodo(id, callback, table = this.table) {
    const s = "DELETE FROM " + table + " WHERE id=?";

    knex.query(s, [id], function(err, result) {
      if (err) throw err;
      callback(result);
    });
  }

  addTodo(todo, callback, table = this.table) {
    const s = "INSERT INTO " + table + " (text) VALUES (?)";
    todo.complete = todo.complete || 0;
    knex.query(s, [todo.text, todo.complete], function(err, result) {
      if (err) throw err;
      callback(result);
    });
  }

  editTodo(todo, callback, table = this.table) {
    const s = "UPDATE " + table + " SET text=? WHERE id=?";

    knex.query(s, [todo.text, todo.id], function(err, result) {
      if (err) throw err;
      callback(result);
    });
  }
}

module.exports = new Todo();
