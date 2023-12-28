/**
 * @swagger
 * tags:
 *   name: Reading Intervals
 *   description: APIs for managing user reading intervals
 * 
 * /api/v1/submit-reading-interval:
 *   post:
 *     summary: Submit a user reading interval
 *     tags: [Reading Intervals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               book_id:
 *                 type: string
 *               start_page:
 *                 type: integer
 *               end_page:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Reading interval submitted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Reading interval submitted successfully
 * 
 * /api/v1/get-recommendations:
 *   get:
 *     summary: Get the most recommended books
 *     tags: [Reading Intervals]
 *     responses:
 *       '200':
 *         description: List of recommended books
 *         content:
 *           application/json:
 *             example:
 *               - book_id: "5"
 *                 book_name: "Clean Code"
 *                 num_of_read_pages: 100
 *               - book_id: "1"
 *                 book_name: "Harry Potter"
 *                 num_of_read_pages: 90
 *               - book_id: "10"
 *                 book_name: "The Kite Runner"
 *                 num_of_read_pages: 20
 */

const express = require('express');
const router = express.Router();
const readingIntervalController = require('../controllers/readingIntervalController');
const recommendationController = require('../controllers/recommendationController');

router.post('/submit-reading-interval', (req, res, next) => {
    readingIntervalController.submitReadingInterval(req, res, next)
});
router.get('/get-recommendations', (req, res, next) => {
    recommendationController.getRecommendations(req, res, next)
});

module.exports = router;