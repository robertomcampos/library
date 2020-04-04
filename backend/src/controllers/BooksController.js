const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const books = await connection('books')
        .join('categories', 'categories.id', '=', 'books.category_id')
        .select([
            'books.*', 
            'categories.name as categoryName',
        ]);

        return response.json(books);
    },
    async getByCategory(request, response) {
        const { id } = request.params;
        const books = await connection('books')
        .where('category_id', id)
        .join('categories', 'categories.id', '=', 'books.category_id')
        .select([
            'books.*', 
            'categories.name as categoryName',
        ]);

        return response.json(books);
    },
}