
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        { text: 'buy ticket to Hawaii'},
        { text: 'play lottery', completed: true},
        { text: 'buy new motorcycle'}
      ]);
    });
};

/*
+------------+------------------+------+-----+-------------------+-------------------+
| Field      | Type             | Null | Key | Default           | Extra             |
+------------+------------------+------+-----+-------------------+-------------------+
| id         | int(10) unsigned | NO   | PRI | NULL              | auto_increment    |
| text       | varchar(255)     | NO   |     | NULL              |                   |
| completed  | tinyint(1)       | YES  |     | 0                 |                   |
| created_at | datetime         | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at | datetime         | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+------------------+------+-----+-------------------+-------------------+
*/
