const Book = require("../models/bookSchema");
const BorrowedBook = require("../models/borrowedSchema");
let bookService = {};

bookService.fetchBooks = async () => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    if (!books) {
      return { status: 400, message: "books not found ", userToken: "" };
    }
const borrowedBooks = await BorrowedBook.find({});

    return {
      status: 200,
      books: books,
      borrowedBooks:borrowedBooks
    };
  } catch (err) {
    console.error(
      "Error occured in login admin in fetch users controller",
      err.message
    );
    res
      .status(500)
      .json({ info: "An error in fetching books in books service " });
  }
};

bookService.addBook = async (
  title,
  author,
  isbn,
  publishedYear,
  availableCopies,
  imageUrl
) => {
  try {
    const book = await Book.findOne({ isbn });
    if (book) {
      return { status: 400, message: "Book with same ISBN already exists " };
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      publishedYear,
      availableCopies,
      imageUrl,
    });

    await newBook.save();
    return { status: 200, message: "Book added successfully ", book: newBook };
  } catch (err) {
    console.error("Error occured in adding book in book service ", err.message);
    res.status(500).json({ info: "An error in adding book in book service " });
  }
};

bookService.editBook = async (
  bookId,
  title,
  author,
  isbn,
  publishedYear,
  availableCopies,
  imageUrl
) => {
  try {
    const existingBook = await Book.findOne({ isbn, _id: { $ne: bookId } });

    if (existingBook) {
      return { status: 400, message: "A book with this ISBN already exists." };
    }
    if (imageUrl) {
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { title, author, isbn, publishedYear, availableCopies, imageUrl },
        { new: true }
      );
      if (!updatedBook) {
        return { status: 404, message: "Book not found." };
      }

      return {
        status: 200,
        message: "Book updated successfully",
        book: updatedBook,
      };
    } else {
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { title, author, isbn, publishedYear, availableCopies },
        { new: true }
      );
      if (!updatedBook) {
        return { status: 404, message: "Book not found." };
      }

      return {
        status: 200,
        message: "Book updated successfully",
        book: updatedBook,
      };
    }
  } catch (err) {
    console.error(
      "Error occured in editing book in book service ",
      err.message
    );
    res.status(500).json({ info: "An error in adding book in book service " });
  }
};

bookService.deleteBook = async (bookId) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return { status: 400, success: false, message: "Book updated failed" };
    }

    return { status: 200, success: true, message: "Book updated successfully" };
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

bookService.borrowBook = async (bookId, userId) => {
  try {
    const BORROW_PERIOD = 14 * 24 * 60 * 60 * 1000;
    const book = await Book.findById(bookId);

    if (!book) {
      return { status: 404, message: "Book not found" };
    }

    if (book.availableCopies < 1) {
      return { status: 400, message: "Book not available" };
    }

    const borrowedBook = new BorrowedBook({
      userId,
      bookId,
      borrowedDate: new Date(),
    });

    book.availableCopies -= 1;
    await book.save();

    await borrowedBook.save();
    return { status: 200, message: "Book borrowed successfully", book: book };
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

bookService.returnBook = async (bookId, userId) => {
  try {

    const borrowedBook = await BorrowedBook.findOne({
      userId,
      bookId,
      returned: false,
    });

    if (!borrowedBook) {
      return { status: 404, message: "Book not found or already returned" };
    }

    borrowedBook.returned = true;
    borrowedBook.returnedDate = new Date();
    await borrowedBook.save();

    const book = await Book.findById(bookId);
    book.availableCopies += 1;
    await book.save();

    return { status: 200, message: "Book returned successfully", book: book };
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

bookService.borrowHistory = async (userId) => {
  try {

    const borrowHistory = await BorrowedBook.find({ userId })
      .populate("bookId", "title author isbn imageUrl")
      .sort({ borrowedDate: -1 });


    return { status: 200, borrowHistory: borrowHistory };
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

bookService.borrowedBooks = async (userId) => {
    try {
  
        const borrowedBooks = await BorrowedBook.find({ userId, returned: false }) 
        .populate("bookId", "title author isbn imageUrl")
        .sort({ borrowedDate: -1 });
  
  
      return { status: 200, borrowedBooks: borrowedBooks };
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = bookService;
