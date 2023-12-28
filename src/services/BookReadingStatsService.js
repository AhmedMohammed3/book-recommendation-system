const BookReadingStats = require('../models/BookReadingStats');

class BookReadingStatsService {
    static instance;
    static getInstance() {
        if (!BookReadingStatsService.instance) {
            BookReadingStatsService.instance = new BookReadingStatsService();
        }
        return BookReadingStatsService.instance;
    }
    async getStatsByBookId(bookId) {
        return await BookReadingStats.findOne({
            book_id: bookId
        });
    }
    async updateBookStats(bookId, updatedBookStatsData) {
        try {
            const bookStat = await this.getStatsByBookId(bookId);
            if (!bookStat) {
                throw new Error('Book stats not found');
            }

            return await BookReadingStats.findOneAndUpdate({
                book_id: bookId
            }, {
                $set: updatedBookStatsData
            }, {
                new: true
            });
        } catch (error) {
            throw new Error(`Error updating book stats: ${error.message}`);
        }
    }

    async getAllBooksStats(condition, sortByObj, limitNum) {
        return await BookReadingStats.find(condition)
            .sort(sortByObj)
            .limit(limitNum);
    }
}

module.exports = BookReadingStatsService;