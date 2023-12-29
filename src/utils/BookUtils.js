class BookUtils {
    static instance;
    static getInstance() {
        if (!BookUtils.instance) {
            BookUtils.instance = new BookUtils();
        }
        return BookUtils.instance;
    }

    async incrementBookReadingPages(start_page, end_page, bookReadingIntervals) {
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
        return new_num_of_read_pages;
    };
}

module.exports = BookUtils