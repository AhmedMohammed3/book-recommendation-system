const ReadingIntervalService = require('../services/ReadingIntervalService');
const BookService = require('../services/BookService');

// src/controllers/recommendationController.js
class RecommendationController {
  constructor(bookService, readingIntervalService) {
    this.bookService = bookService;
    this.readingIntervalService = readingIntervalService;
  }

  async getRecommendations(req, res, next) {
    try {
      // Check if users and books exist
      const users = await this.readingIntervalService.getReadingIntervals();
      const books = await this.bookService.getBooks();
      if (users.length === 0 || books.length === 0) {
        return res.status(404).json({
          error: 'Users or books not found'
        });
      }

      // Aggregate and calculate most recommended books
      const result = await this.readingIntervalService.aggregateRecommendations();

      // Get book names from the BookService
      const recommendations = await Promise.all(
        result.map(async (item) => {
          const book = await this.bookService.getBookById(item._id);
          return {
            book_id: item._id,
            book_name: book ? book.book_name : 'Unknown',
            num_of_read_pages: item.num_of_read_pages,
          };
        })
      );

      res.status(200).json(recommendations);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RecommendationController(
  BookService.getInstance(),
  ReadingIntervalService.getInstance()
);