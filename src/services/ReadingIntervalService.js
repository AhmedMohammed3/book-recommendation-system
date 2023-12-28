const ReadingInterval = require('../models/ReadingInterval');

class ReadingIntervalService {
  static instance;
  static getInstance() {
    if (!ReadingIntervalService.instance) {
      ReadingIntervalService.instance = new ReadingIntervalService();
    }
    return ReadingIntervalService.instance;
  }

  async getReadingIntervalByBookId(book_id) {
    return await ReadingInterval.find({
      book_id
    });
  }

  async getReadingIntervals() {
    return await ReadingInterval.find({});
  }

  async createReadingIntervals(object) {
    return await ReadingInterval.create(object);
  }

  async aggregateRecommendations() {
    return await ReadingInterval.aggregate([{
        $sort: {
          "book_id": 1,
          "start_page": 1,
        },
      },
      {
        $group: {
          _id: '$book_id',
          book_name: {
            $first: '$book_name'
          },
          readingIntervals: {
            $push: {
              start_page: "$start_page",
              end_page: "$end_page",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          book_name: 1,
          readingIntervals: 1,
          num_of_read_pages: {
            $sum: {
              $map: {
                input: "$readingIntervals",
                as: "interval",
                in: {
                  $cond: [{
                      $gte: ["$$interval.end_page", "$$interval.start_page"]
                    },
                    {
                      $subtract: ["$$interval.end_page", "$$interval.start_page"]
                    },
                    0,
                  ],
                },
              },
            },
          },
          individualReadPages: {
            $map: {
              input: "$readingIntervals",
              as: "interval",
              in: {
                $cond: [{
                    $gte: ["$$interval.end_page", "$$interval.start_page"]
                  },
                  {
                    $subtract: ["$$interval.end_page", "$$interval.start_page"]
                  },
                  0,
                ],
              },
            },
          },
        },
      },
      {
        $sort: {
          num_of_read_pages: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
  }


}

module.exports = ReadingIntervalService;