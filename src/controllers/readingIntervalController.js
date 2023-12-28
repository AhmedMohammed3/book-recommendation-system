const ReadingIntervalService = require('../services/ReadingIntervalService');
const UserService = require('../services/UserService');
const BookService = require('../services/BookService');
const BookReadingStatsService = require('../services/BookReadingStatsService');
const SmsMiddlewareFactory = require('../services/smsProviders/SmsMiddlewareFactory');
const BookUtils = require('../utils/BookUtils');

class ReadingIntervalController {
  constructor(userService, bookService, readingIntervalService, bookUtils) {
    this.userService = userService;
    this.bookService = bookService;
    this.readingIntervalService = readingIntervalService;
    this.bookUtils = bookUtils;
  }

  async submitReadingInterval(req, res, next) {
    try {
      const {
        user_id,
        book_id,
        start_page,
        end_page
      } = req.body;

      const user = await this.userService.getUserById(user_id);
      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

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

      const bookReadingIntervals = await this.readingIntervalService.getReadingIntervalByBookId(book_id);

      setImmediate(() => {
        this.bookUtils.incrementBookReadingPages(book_id, start_page, end_page, bookReadingIntervals);
      });


      const created = await this.readingIntervalService.createReadingIntervals({
        user_id,
        book_id,
        start_page,
        end_page,
      });

      if (!created) {
        throw new Error("Cannot add reading intervals");
      }

      const smsService = SmsMiddlewareFactory.getSmsProvider();
      smsService.sendThankYouSMS(user_id).then(sent => {
        console.log("SMS Sent");
      }).catch(err => {
        console.log("SMS Not Sent", err);
      })

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
  ReadingIntervalService.getInstance(),
  BookUtils.getInstance(BookReadingStatsService.getInstance())
);