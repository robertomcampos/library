
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { id: 1, name: 'Aventura' },
        { id: 2, name: 'Conto' },
        { id: 3, name: 'Fantasia' },
        { id: 4, name: 'Romance' },
      ]);
    });
};
