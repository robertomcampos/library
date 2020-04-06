const connection = require('../database/connection');
const crypto = require('crypto');
const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    async create(request, response) {
        const {
            startsOn,
            endsOn,
            books,
        } = request.body;

        const user = request.headers.authorization;

        const protocol = crypto.randomBytes(4).toString('HEX');

        const data = {
            startsOn,
            endsOn,
            user_id: user,
            protocol,
        }

        const [reservation_id] = await connection('reservations').insert(data);

        const booksToReserv = books.map(id => ({ book_id: id, reservation_id: reservation_id }));

        await connection('reservations_books').insert(booksToReserv);

        return response.json({ ...data, id: reservation_id });
    },
    createValidations() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                startsOn: Joi.date().required(),
                endsOn: Joi.date().required(),
                books: Joi.array().required()
            }),
        })
    }
}
