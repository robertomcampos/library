
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
          thumbnail: 'lot1.jpg',
          category_id: 3
        },
        {
          id: 2,
          name: 'O Senhor dos Anéis: As duas Torres',
          author: 'J.R.R.Tolkien',
          thumbnail: 'lot2.jpg',
          category_id: 3
        },
        {
          id: 3,
          name: 'O Senhor dos Anéis: O Retorno do Rei',
          author: 'J.R.R.Tolkien',
          thumbnail: 'lot3.jpg',
          category_id: 3
        },
        {
          id: 4,
          name: 'O Silmarillion',
          author: 'J.R.R.Tolkien',
          thumbnail: 'silmarillion.jpg',
          category_id: 3
        },
        {
          id: 5,
          name: 'O Hobbit',
          author: 'J.R.R.Tolkien',
          thumbnail: 'hobbit.jpg',
          category_id: 3
        },
        {
          id: 6,
          name: 'O Alienista',
          author: 'Machado de Assis',
          thumbnail: 'alienista.jpg',
          category_id: 2
        },
        {
          id: 7,
          name: 'Ensaio sobre a cegueira',
          author: 'José Saramago',
          thumbnail: 'cegueira.jpg',
          category_id: 4
        },
        {
          id: 8,
          name: 'A Batalha do Apocalipse',
          author: 'Eduardo Spohr',
          thumbnail: 'apocalipse.jpg',
          category_id: 1
        },
        
        {
          id: 9,
          name: 'O Rei do Inverno',
          author: 'Bernard Cornwell',
          thumbnail: 'reidoinverno-romance.jpg',
          category_id: 4
        },
        
        {
          id: 10,
          name: 'O destino das Terras Altas',
          author: 'Hannah Howell',
          thumbnail: 'odestino-romance.jpg',
          category_id: 4
        },
        {
          id: 11,
          name: 'Um romance durante V cruzada',
          author: 'Cláudia Ruiz Hespanha',
          thumbnail: 'quintacruzada-romance.jpg',
          category_id: 4
        },
        {
          id: 12,
          name: 'Um renascer de uma lenda',
          author: 'Pandora L',
          thumbnail: 'renascer-romance.jpg',
          category_id: 4
        },
        {
          id: 13,
          name: 'Dom Casmurro',
          author: 'Machado de Assis',
          thumbnail: 'dom-romance.jpg',
          category_id: 4
        },
        {
          id: 14,
          name: 'O Cógido Da Vinci',
          author: 'Dan Brown',
          thumbnail: 'davinci-romance.jpg',
          category_id: 4
        },
      ]);
    });
};
