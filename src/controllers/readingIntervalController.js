const ReadingIntervalService = require('../services/ReadingIntervalService');
const UserService = require('../services/UserService');
const BookService = require('../services/BookService');
const BookReadingStatsService = require('../services/BookReadingStatsService');
const SmsMiddlewareFactory = require('../services/smsProviders/SmsMiddlewareFactory');
const BookUtils = require('../utils/BookUtils');

class ReadingIntervalController {
  constructor(userService, bookService, readingIntervalService, bookReadingStatsService, bookUtils) {
    this.userService = userService;
    this.bookService = bookService;
    this.readingIntervalService = readingIntervalService;
    this.bookReadingStatsService = bookReadingStatsService;
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

      if (start_page > end_page || end_page == 0) {
        return res.status(404).json({
          error: 'Start Page cannot be after end page'
        });
      }

      const bookReadingIntervals = await this.readingIntervalService.getReadingIntervalByBookId(book_id);

      setImmediate(async () => {
        const bookStat = await this.bookReadingStatsService.getStatsByBookId(book_id);
        if (!bookStat) {
          throw new Error('Book stats not found');
        }

        let new_num_of_read_pages = this.bookUtils.incrementBookReadingPages(start_page, end_page, bookReadingIntervals);

        if (new_num_of_read_pages > 0) {
          const updated = await this.bookReadingStatsService.updateBookStats(book_id, {
            num_of_read_pages: bookStat.num_of_read_pages + new_num_of_read_pages
          });
          if (updated) {
            console.log("Book " + book_id + " stats is updated");
          } else {
            console.log("Failed to update book reading stats");
          }
        } else {
          console.log("No need to update book reading stats");
        }
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
  BookReadingStatsService.getInstance(),
  BookUtils.getInstance()
);