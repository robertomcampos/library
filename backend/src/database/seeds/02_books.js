
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {
          id: 1,
          name: 'O Senhor dos Anéis: A Sociedade do Anel',
          author: 'J.R.R.Tolkien',
          thumbnail: 'lot1.png',
          category_id: 3
        },
        {
          id: 2,
          name: 'O Senhor dos Anéis: As duas Torres',
          author: 'J.R.R.Tolkien',
          thumbnail: 'lot2.png',
          category_id: 3
        },
        {
          id: 3,
          name: 'O Senhor dos Anéis: O Retorno do Rei',
          author: 'J.R.R.Tolkien',
          thumbnail: 'lot2.png',
          category_id: 3
        },
        {
          id: 4,
          name: 'O Silmarillion',
          author: 'J.R.R.Tolkien',
          thumbnail: 'silmarillion.png',
          category_id: 3
        },
        {
          id: 5,
          name: 'O Hobbit',
          author: 'J.R.R.Tolkien',
          thumbnail: 'hobbit.png',
          category_id: 3
        },
        {
          id: 6,
          name: 'O Alienista',
          author: 'Machado de Assis',
          thumbnail: 'alienista.png',
          category_id: 2
        },
        {
          id: 7,
          name: 'Ensaio sobre a cegueira',
          author: 'José Saramago',
          thumbnail: 'cegueira.png',
          category_id: 4
        },
        {
          id: 8,
          name: 'A Batalha do Apocalipse',
          author: 'Eduardo Spohr',
          thumbnail: 'apocalipse.png',
          category_id: 1
        },
      ]);
    });
};
