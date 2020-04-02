const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { name, email, password } = request.body;

        const id = await connection('users')
            .returning('id')
            .insert({
                name,
                email,
                password
            });


        return response.json({ id });
    }
}