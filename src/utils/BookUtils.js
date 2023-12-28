class BookUtils {
    static instance;
    static getInstance(bookReadingStatsService) {
        if (!BookUtils.instance) {
            BookUtils.instance = new BookUtils(bookReadingStatsService);
        }
        return BookUtils.instance;
    }
    constructor(bookReadingStatsService) {
        this.bookReadingStatsService = bookReadingStatsService;

    }

    async incrementBookReadingPages(book_id, start_page, end_page, bookReadingIntervals) {
        const bookStat = await this.bookReadingStatsService.getStatsByBookId(book_id);
        if (!bookStat) {
            throw new Error('Book stats not found');
        }

        let new_num_of_read_pages = 0
        if (bookReadingIntervals.length === 0) {
            new_num_of_read_pages = end_page - start_page;
        } else {
            const visitedPages = new Set();

            for (const interval of bookReadingIntervals) {
                for (let existingPageNum = interval.start_page; existingPageNum < interval.end_page; existingPageNum++) {
                    visitedPages.add(existingPageNum);
                }
            }

            for (let pageNumToInsert = start_page; pageNumToInsert < end_page; pageNumToInsert++) {
                if (!visitedPages.has(pageNumToInsert)) {
                    new_num_of_read_pages++;
                }
            }
        }

        if (new_num_of_read_pages > 0) {
            const updated = await this.bookReadingStatsService.updateBookStats(book_id, {
                num_of_read_pages: bookStat.num_of_read_pages + new_num_of_read_pages
            });
            if (!updated) {
                console.log("Failed to update book reading stats");
            } else {
                console.log("Book " + book_id + " stats is updated");
            }
        }
    };
}

module.exports = BookUtils