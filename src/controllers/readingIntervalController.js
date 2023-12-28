const ReadingIntervalService = require('../services/ReadingIntervalService');
const UserService = require('../services/UserService');
const BookService = require('../services/BookService');
const SmsMiddlewareFactory = require('../services/smsProviders/SmsMiddlewareFactory');

class ReadingIntervalController {
  constructor(userService, bookService, readingIntervalService) {
    this.userService = userService;
    this.bookService = bookService;
    this.readingIntervalService = readingIntervalService;
  }

  async submitReadingInterval(req, res, next) {
    try {
      const {
        user_id,
        book_id,
        start_page,
        end_page
      } = req.body;

      // Check if user exists
      const user = await this.userService.getUserById(user_id);
      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      // Check if book exists
      const book = await this.bookService.getBookById(book_id);
      if (!book) {
        return res.status(404).json({
          error: 'Book not found'
        });
      }

      if (start_page > end_page) {
        return res.status(404).json({
          error: 'Start Page cannot be after end page'
        });
      }

      // Save reading interval to the database
      await this.readingIntervalService.createReadingIntervals({
        user_id,
        book_id,
        start_page,
        end_page,
      });

      // Use Factory Pattern to create SMSService instance
      const smsService = SmsMiddlewareFactory.getSmsProvider();
      smsService.sendThankYouSMS(user_id);

      res.status(201).json({
        message: 'Reading interval submitted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReadingIntervalController(
  UserService.getInstance(),
  BookService.getInstance(),
  ReadingIntervalService.getInstance()
);