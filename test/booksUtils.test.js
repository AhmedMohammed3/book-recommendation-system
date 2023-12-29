const chai = require('chai');
const sinon = require('sinon');
const BookUtils = require('../src/utils/BookUtils');
const {
    expect
} = chai;

describe('BookUtils', () => {
    let bookUtils;

    beforeEach(() => {
        bookUtils = new BookUtils();
        BookUtils.instance = null;
    });

    describe('incrementBookReadingPages', () => {
        it('should calculate new_num_of_read_pages when intervals are empty', async () => {
            const startPage = 1;
            const endPage = 5;
            const bookReadingIntervals = [];

            const result = await bookUtils.incrementBookReadingPages(startPage, endPage, bookReadingIntervals);

            expect(result).to.equal(4);
        });

        it('should calculate new_num_of_read_pages with intervals', async () => {
            const startPage = 1;
            const endPage = 5;
            const bookReadingIntervals = [{
                start_page: 2,
                end_page: 4
            }];

            const stub = sinon.stub(bookUtils, 'incrementBookReadingPages').resolves(3);

            const result = await bookUtils.incrementBookReadingPages(startPage, endPage, bookReadingIntervals);

            expect(result).to.equal(3);

            stub.restore();
        });
    });
});