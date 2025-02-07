const bookService = require('../services/bookService');
let bookController = {};


bookController.fetchBooks = async (req, res) => {
  try {

    const result = await bookService.fetchBooks();

    res.status(result.status).json({
      borrowedBooks:result.borrowedBooks,
      books:result.books,
      success: result.success,
    });
  } catch (err) {
    console.error("Error occurred in fetch users data", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



bookController.addBook = async (req, res) => {
  try {

    const { title, author, isbn, publishedYear, availableCopies } = req.body;
    const imageUrl = req.file?.path; 

    if (!imageUrl) {
      return res.status(400).json({ message: "Image upload failed" });
    }
    const result = await bookService.addBook(title, author, isbn, publishedYear, availableCopies,imageUrl);

    res.status(result.status).json({
      message:result.message,
      book:result.book,
      success: result.success,
    });
  } catch (err) {
    console.error("Error occurred in fetch users data", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


bookController.editBook = async (req, res) => {
  try {

    const { bookId,title, author, isbn, publishedYear, availableCopies } = req.body;
    const imageUrl = req.file?.path; 
console.log('idddd',bookId)

    const result = await bookService.editBook(bookId,title, author, isbn, publishedYear, availableCopies,imageUrl);

    res.status(result.status).json({
      message:result.message,
      book:result.book,
      success: result.success,
    });
  } catch (err) {
    console.error("Error occurred in edit book", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


bookController.deleteBook = async (req, res) => {
  try {

const {bookId} = req.params;

    const result = await bookService.deleteBook(bookId);

    res.status(result.status).json({
      message:result.message,
      book:result.book,
      success: result.success,
    });
  } catch (err) {
    console.error("Error occurred in fetch users data", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




bookController.borrowBook = async (req, res) => {
  try {
const {bookId} = req.params
const user = req.user;
    const result = await bookService.borrowBook(bookId,user._id);

    res.status(result.status).json({
      message:result.message,
    });
  } catch (err) {
    console.error("Error occurred in borrowBook", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

bookController.returnBook = async (req, res) => {
  try {
const {bookId} = req.params
console.log(bookId);
const user = req.user;
    const result = await bookService.returnBook(bookId,user._id);

    res.status(result.status).json({
      message:result.message,
    });
  } catch (err) {
    console.error("Error occurred in borrowBook", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

bookController.borrowHistory = async (req, res) => {
  try {

const user = req.user;
    const result = await bookService.borrowHistory(user._id);

    res.status(result.status).json({
      borrowHistory:result.borrowHistory,
    });
  } catch (err) {
    console.error("Error occurred in borrowBook", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


bookController.borrowedBooks = async (req, res) => {
  try {

const user = req.user;
    const result = await bookService.borrowedBooks(user._id);

    res.status(result.status).json({
      borrowedBooks:result.borrowedBooks,
    });
  } catch (err) {
    console.error("Error occurred in borrowBook", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = bookController;
