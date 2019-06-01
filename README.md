# **Folder**: `07-ORM-To-Knex/Unsolved`

## **INSTRUCTIONS**

The goal of this exercise is to set up the app foundation

### App Set Up

* [ ] Open the folder `07-ORM-To-Knex/Unsolved`, and run `npm install`
* [ ] Create a `'knex_todolist_db` DB using the `'schema.sql'`
* [ ] Follow the instructions [here](https://knexjs.org/#Migrations-CLI) to generate a `knexfile.js`
* [ ] Modify the `knexfile.js` so it includes your MySQL connection configuration information. See example below:

```javascript
module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "knex_todolist_db",
    debug: ['ComQueryPacket', 'RowDataPacket']
  }
};
```

* [ ] Modify the `/config/connection.js` so that it only connects to MySQL using Knex.js. You should use your `knexfile.js` to instantiate your knex instance. See example below:

```javascript
// Creates mySQL connection using Knex.js
const Knex = require('knex')(require('../../knexfile'))

// Exports the connection for other files to use
module.exports = Knex;
```

### Schema Set Up

* [ ] Follow the instructions [here](https://knexjs.org/#Migrations-CLI) to generate a migration file named `'create_todo_table'`.
* [ ] Within your migration file write the code to create a `'todo'` table.

  * Your `'todo'` table must include the following column definitions:
    * id: [auto-increment, primary key],
    * text: [varchar (255), not null],
    * completed: [boolean, default false],
    * created_at: [timestamp],
    * updated_at: [timestamp]

  * *USE THE [DOCUMENTATION](https://knexjs.org/#Schema-Building) TO CREATE THE APPROPRIATE COLUMN DATA TYPES*
  * Check [this example](https://knexjs.org/#Migrations-API-transactions) to confirm that your migration file is properly formatted

* [ ] Follow the instructions [here](https://knexjs.org/#Migrations-CLI) to run your migration file to create your `'todo'` table.

* [ ] From SQL Workbench confirm that your `'todo'` table was created.

### Seed Setup

* [ ] Follow the instructions [here](https://knexjs.org/#Seeds-CLI) to generate a seed file named `'todo_seed'`.
* [ ] Within your seed file modify the boilerplate function and insert 2 or 3  todo tasks.

* [ ] Follow the instructions [here](https://knexjs.org/#Seeds-CLI) to run your seed file to insert your seed data.

* [ ] From SQL Workbench confirm that your `'todo'` table has your test data.

### Great Job
