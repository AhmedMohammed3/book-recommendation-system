const mongoose = require('mongoose');

const readingIntervalSchema = new mongoose.Schema({
  user_id: String,
  book_id: String,
  start_page: Number,
  end_page: Number,
});

module.exports = mongoose.model('ReadingInterval', readingIntervalSchema);
