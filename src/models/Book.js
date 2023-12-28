const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_id: String,
  book_name: String,
});

module.exports = mongoose.model('Book', bookSchema);
