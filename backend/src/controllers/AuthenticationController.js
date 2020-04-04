const connection = require('../database/connection');

module.exports = {
    async authenticate(request, response) {

        console.log('entrou');

        const { email, password } = request.body;

        const [user] = await connection('users')
            .where('email', email)
            .andWhere('password', password);
            
        if (!user) {
            // todo: não consigo capturar o erro no front
            return response.status(400).json({ error: 'O usuário ou a senha estão incorretos.' });
        }

        return response.json(user);
    },
}