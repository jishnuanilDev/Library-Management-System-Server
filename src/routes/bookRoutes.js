const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../middlewares/upload');
bookRouter.get('/fetch-books',bookController.fetchBooks);
bookRouter.post('/add-book',upload.single("image"),bookController.addBook);
bookRouter.put('/edit-book',upload.single("image"),bookController.editBook);
bookRouter.delete('/delete-book/:bookId',bookController.deleteBook);

module.exports = bookRouter;