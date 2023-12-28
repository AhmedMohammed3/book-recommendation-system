const mongoose = require('mongoose');

const bookReadingStatsSchema = new mongoose.Schema({
  book_id: String,
  num_of_read_pages: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('BookReadingStats', bookReadingStatsSchema);