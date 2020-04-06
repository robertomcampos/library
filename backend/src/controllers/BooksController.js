const connection = require('../database/connection');
const paginate = require('../services/paginationTemplate');
const constants = require('../services/constants');
const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    async index(request, response) {
        const page = request.query.page ? parseInt(request.query.page) : 0;
        const skip = (page - 1) * constants.ITEMS_PER_PAGE;

        try {
            const [count] = await connection('books').count();

            const books = await connection('books')
                .join('categories', 'categories.id', '=', 'books.category_id')
                .limit(constants.ITEMS_PER_PAGE)
                .offset(skip)
                .select([
                    'books.*',
                    'categories.name as categoryName',
                ]);

            return response.json(paginate(books, constants.ITEMS_PER_PAGE, page, count['count(*)']));
        } catch (error) {
            return response.status(400).json({ message: error });
        }
    },
    indexValidations() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number(),
            })
        })
    },
    async getByCategory(request, response) {
        const { id } = request.params;
        const page = request.query.page ? parseInt(request.query.page) : 0;
        const skip = (page - 1) * constants.ITEMS_PER_PAGE;

        try {
            const [count] = await connection('books').where('category_id', id).count();

            const books = await connection('books')
                .where('category_id', id)
                .join('categories', 'categories.id', '=', 'books.category_id')
                .limit(constants.ITEMS_PER_PAGE)
                .offset(skip)
                .select([
                    'books.*',
                    'categories.name as categoryName',
                ]);

            return response.json(paginate(books, constants.ITEMS_PER_PAGE, page, count['count(*)']));
        } catch (error) {
            return response.status(400).json({ message: error });
        }
    },
}
