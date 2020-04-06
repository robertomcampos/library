const express = require('express');

const UserController = require('./controllers/UserController');
const AuthenticationController = require('./controllers/AuthenticationController');
const ReservationController = require('./controllers/ReservationController');
const CategoriesController = require('./controllers/CategoriesController');
const BooksController = require('./controllers/BooksController');

const routes = express.Router();

routes.post("/authenticate/", AuthenticationController.authenticateValidations(), AuthenticationController.authenticate);
routes.post("/users/", UserController.createValidations(), UserController.create);
routes.post("/reservations/", ReservationController.createValidations(), ReservationController.create);
routes.get("/books/", BooksController.index);
routes.get("/books/categories/:id", BooksController.getByCategory);
routes.get("/categories/", CategoriesController.index);

module.exports = routes;