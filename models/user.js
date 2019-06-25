const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  keyId: String,
  name: String
});

module.exports = User = mongoose.model('users', UserSchema);
