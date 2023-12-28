const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: String,
  username: String,
});

module.exports = mongoose.model('User', userSchema);
