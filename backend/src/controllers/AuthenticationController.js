const connection = require('../database/connection');
const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    // dummy authentication
    async authenticate(request, response) {

        const { email, password } = request.body;

        try {
            const [user] = await connection('users')
                .where('email', email)
                .andWhere('password', password);

            if (!user) {
                return response.status(400).json({ message: 'O usuário ou a senha estão incorretos.' });
            }

            return response.json(user);
            
        } catch (error) {
            return response.status(400).json({ message: error });
        }
    },
    authenticateValidations() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required().email(),
                password: Joi.string().required(),
            })
        })
    }
}