const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const categories = await connection('categories').select('*');

        return response.json(categories);
    },
}