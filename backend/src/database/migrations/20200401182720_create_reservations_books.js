
exports.up = function (knex) {
    return knex.schema.createTable('reservations_books', function (table) {
        table.increments().primary();

        table.string('book_id').notNullable();
        table.foreign('book_id').references('id').inTable('books');

        table.string('reservation_id').notNullable();
        table.foreign('reservation_id').references('id').inTable('reservations');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('reservations_books');
};
