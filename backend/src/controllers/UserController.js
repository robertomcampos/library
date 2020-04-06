const connection = require('../database/connection');
const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    async create(request, response) {
        const { name, email, password } = request.body;

        try {
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
        } catch (error) {
            return response.status(400).json({ error: error });
        }
    },
    createValidations() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                password: Joi.string().required(),
            })
        })
    }
}