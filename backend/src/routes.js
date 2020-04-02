const express = require('express');

const UserController = require('./controllers/UserController');
const AuthenticationController = require('./controllers/AuthenticationController');
const ReservationController = require('./controllers/ReservationController');
const CategoriesController = require('./controllers/CategoriesController');
const BooksnController = require('./controllers/BooksController');

const routes = express.Router();

routes.post("/authenticate/", AuthenticationController.authenticate);
routes.post("/users/", UserController.create);
routes.post("/reservations/", ReservationController.create);
routes.get("/books/", BooksnController.index);
routes.get("/categories/", CategoriesController.index);

module.exports = routes;