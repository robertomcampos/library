const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const { 
            startsOn,
            endsOn,
            books,
        } = request.body;

        const user = request.headers.authorization;

        const protocol = crypto.randomBytes(4).toString('HEX');

        const [reservationId] = await connection('reservations')
            .returning('id')
            .insert({
                startsOn,
                endsOn,
                user_id: user,
                protocol,
            });

        const booksToReserv = books.map(id => ({ book_id: id, reservation_id: reservationId }));

        await connection('reservations_books').insert(booksToReserv);

        return response.json({ protocol });
    }
}
