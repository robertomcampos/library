
exports.up = function (knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments().primary();
        table.string('name').notNullable();
        table.string('author').notNullable();
        table.string('thumbnail').notNullable();
        table.string('category_id').notNullable();

        table.foreign('category_id').references('id').inTable('categories');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('books');
};
