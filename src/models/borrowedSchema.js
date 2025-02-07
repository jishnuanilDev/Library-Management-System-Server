const mongoose = require("mongoose");

const borrowedBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User collection
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Reference to Book collection
      required: true,
    },
    borrowedDate: {
      type: Date,
      default: Date.now,
    },
    returnedDate: {
      type: Date,
      default: null,
    },
    returned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BorrowedBook = mongoose.model("BorrowedBook", borrowedBookSchema);

module.exports = BorrowedBook;
