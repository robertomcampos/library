const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { name, email, password } = request.body;

        const [id] = await connection('users')
            .insert({
                name,
                email,
                password
            });

            const user = await connection('users')
            .where('id', id)
            .first();

        return response.json(user);
    }
}