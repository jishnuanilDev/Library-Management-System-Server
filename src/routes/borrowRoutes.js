const express = require('express');
const borrowRouter = express.Router();
const bookController = require('../controllers/bookController');
const authProtect = require('../middlewares/auth');
borrowRouter.post('/borrow/:bookId',authProtect,bookController.borrowBook);
borrowRouter.put('/return/:bookId',authProtect,bookController.returnBook);
borrowRouter.get('/borrow-history',authProtect,bookController.borrowHistory);
borrowRouter.get('/borrowed-books',authProtect,bookController.borrowedBooks);
module.exports = borrowRouter;