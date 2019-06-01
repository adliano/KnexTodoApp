exports.up = function (knex, Promise) {
    return knex.schema.createTable('todo', function (table) {
        table.increments('id');
        table.string('text').notNullable();
        table.boolean('completed').default(false);
        /*
        timestamps — table.timestamps([useTimestamps], [defaultToNow])
        Adds created_at and updated_at columns on the database, 
        etting each to datetime types. When true is passed as the first 
        argument a timestamp type is used instead. Both colums default to being 
        not null and using the current timestamp when true is passed as the second argument. 
        Note that on MySQL the .timestamps() only have seconds precision, 
        to get better precision use the .datetime or 
        .timestamp methods directly with precision.
         */
        table.timestamps(false, true);
    })

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('todo');
};
/*
 id: [auto-increment, primary key],
text: [varchar (255), not null],
completed: [boolean, default false],
created_at: [timestamp],
updated_at: [timestamp]
 */