const chai = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');

const app = require('../server');
const recommendationController = require('../src/controllers/recommendationController');
const BookReadingStatsService = require('../src/services/BookReadingStatsService');
const BookService = require('../src/services/BookService');

const {
  expect
} = chai;
const request = supertest(app);

describe('RecommendationController', () => {

  describe('GET /api/v1/get-recommendations', () => {
    it('should return recommendations', async () => {
      const getAllBooksStatsStub = sinon.stub(BookReadingStatsService.prototype, 'getAllBooksStats').resolves([{
          book_id: 1,
          num_of_read_pages: 100
        },
        {
          book_id: 2,
          num_of_read_pages: 200
        },
      ]);

      const getBookByIdStub = sinon.stub(BookService.prototype, 'getBookById').resolves({
        book_id: 1,
        book_name: 'Test Book',
      });

      const response = await request.get('/api/v1/get-recommendations');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(2);
      expect(response.body[0].book_id).to.equal(1);
      expect(response.body[0].book_name).to.equal('Test Book');
      expect(response.body[0].num_of_read_pages).to.equal(100);


      getAllBooksStatsStub.restore();
      getBookByIdStub.restore();
    });

    it('should handle errors and call next middleware', async () => {
      const getAllBooksStatsStub = sinon.stub(BookReadingStatsService.prototype, 'getAllBooksStats').rejects(new Error('Test error'));
      const response = await request.get('/api/v1/get-recommendations');
      expect(response.status).to.equal(500);
      getAllBooksStatsStub.restore();
    });
  });
});