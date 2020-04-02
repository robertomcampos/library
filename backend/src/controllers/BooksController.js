const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const books = await connection('books').select('*');

        return response.json(books);
    },
}