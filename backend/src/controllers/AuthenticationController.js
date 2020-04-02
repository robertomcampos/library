const connection = require('../database/connection');

module.exports = {
    async authenticate(request, response) {
        const { email, password } = request.body;

        const [user] = await connection('users')
            .where('email', email)
            .andWhere('password', password);

        if (!user) {
            return response.status(400).json({ error: 'O usuário ou a senha estão incorretos.' });
        }

        return response.json(user);
    },
}