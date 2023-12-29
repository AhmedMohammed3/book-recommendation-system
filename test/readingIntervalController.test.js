const chai = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');

const app = require('../server');
const UserService = require('../src/services/UserService');
const BookService = require('../src/services/BookService');
const ReadingIntervalService = require('../src/services/ReadingIntervalService');
const SmsMiddlewareFactory = require('../src/services/smsProviders/SmsMiddlewareFactory');
const {
  expect
} = chai;
const request = supertest(app);

describe('ReadingIntervalController', () => {

  describe('POST /api/v1/submit-reading-interval', () => {
    it('should submit a reading interval successfully', async () => {
      const getUserByIdStub = sinon.stub(UserService.prototype, 'getUserById').resolves({
        user_id: '111'
      });
      const getBookByIdStub = sinon.stub(BookService.prototype, 'getBookById').resolves({
        book_id: '1'
      });
      const getReadingIntervalByBookIdStub = sinon.stub(ReadingIntervalService.prototype, 'getReadingIntervalByBookId').resolves([]);
      const createReadingIntervalsStub = sinon.stub(ReadingIntervalService.prototype, 'createReadingIntervals').resolves(true);
      const sendThankYouSMSSpy = sinon.spy(SmsMiddlewareFactory.getSmsProvider(), 'sendThankYouSMS');

      const response = await request
        .post('/api/v1/submit-reading-interval')
        .send({
          user_id: "111",
          book_id: "1",
          start_page: 1,
          end_page: 10,
        });

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Reading interval submitted successfully');
      expect(getUserByIdStub.calledOnce).to.be.true;
      expect(getBookByIdStub.calledOnce).to.be.true;
      expect(getReadingIntervalByBookIdStub.calledOnce).to.be.true;
      expect(createReadingIntervalsStub.calledOnce).to.be.true;
      expect(sendThankYouSMSSpy.calledOnce).to.be.true;

      getUserByIdStub.restore();
      getBookByIdStub.restore();
      getReadingIntervalByBookIdStub.restore();
      createReadingIntervalsStub.restore();
      sendThankYouSMSSpy.restore();
    });

    it('should handle errors and call next middleware', async () => {
      const getUserByIdStub = sinon.stub(UserService.prototype, 'getUserById').rejects(new Error('Test error'));

      const response = await request
        .post('/api/v1/submit-reading-interval')
        .send({
          user_id: 1,
          book_id: 1,
          start_page: 1,
          end_page: 10,
        });

      expect(response.status).to.equal(500);

      getUserByIdStub.restore();
    });
  });
});