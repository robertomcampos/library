
exports.up = function (knex) {
    return knex.schema.createTable('reservations', function (table) {
        table.increments();
        table.datetime('startsOn');
        table.datetime('endsOn');
        table.string('protocol');

        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('reservations');
};
