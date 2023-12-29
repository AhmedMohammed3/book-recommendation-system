const express = require('express');
const router = express.Router();
const readingIntervalController = require('../controllers/readingIntervalController');
const recommendationController = require('../controllers/recommendationController');
/**
 * @swagger
 * /api/v1/submit-reading-interval:
 *   post:
 *     summary: Submit Reading Interval
 *     description: Submits a reading interval for a user and book.
 *     parameters:
 *       - in: body
 *         name: readingInterval
 *         description: Reading Interval object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               description: ID of the user submitting the reading interval
 *             book_id:
 *               type: string
 *               description: ID of the book for the reading interval
 *             start_page:
 *               type: integer
 *               description: Starting page number
 *             end_page:
 *               type: integer
 *               description: Ending page number
 *     responses:
 *       201:
 *         description: Reading interval submitted successfully
 *       404:
 *         description: User not found, Book not found, or Start Page cannot be after end page
 */
router.post('/submit-reading-interval', (req, res, next) => {
    readingIntervalController.submitReadingInterval(req, res, next)
});

/**
 * @swagger
 * /api/v1/get-recommendations:
 *   get:
 *     summary: Get Recommendations
 *     description: Retrieves book recommendations based on reading statistics.
 *     responses:
 *       200:
 *         description: Successful response with an array of book recommendations
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               book_id:
 *                 type: string
 *                 description: ID of the recommended book
 *               book_name:
 *                 type: string
 *                 description: Name of the recommended book
 *               num_of_read_pages:
 *                 type: integer
 *                 description: Number of pages read for the recommended book
 */
router.get('/get-recommendations', (req, res, next) => {
    recommendationController.getRecommendations(req, res, next)
});

module.exports = router;