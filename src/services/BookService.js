const Book = require('../models/Book');

class BookService {
    static instance;
    static getInstance() {
        if (!BookService.instance) {
            BookService.instance = new BookService();
        }
        return BookService.instance;
    }
    async getBookById(book_id) {
        return await Book.findOne({
            book_id
        });
    }
    async getBooks() {
        return await Book.find({});
    }
}

module.exports = BookService;