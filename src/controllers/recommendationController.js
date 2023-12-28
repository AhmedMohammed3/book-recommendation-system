const BookReadingStatsService = require('../services/BookReadingStatsService');
const BookService = require('../services/BookService');

class RecommendationController {
  constructor(bookService, bookReadingStatsService) {
    this.bookService = bookService;
    this.bookReadingStatsService = bookReadingStatsService;
  }

  async getRecommendations(req, res, next) {
    try {
      const result = await this.bookReadingStatsService.getAllBooksStats({
        num_of_read_pages: {
          $gt: 0
        }
      }, {
        num_of_read_pages: -1
      }, 5);
      const recommendations = await Promise.all(
        result.map(async (item) => {
          const book = await this.bookService.getBookById(item.book_id);
          if (!book) {
            throw new Error("Book not found");
          }
          return {
            book_id: book.book_id,
            book_name: book.book_name,
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
  BookReadingStatsService.getInstance()
);