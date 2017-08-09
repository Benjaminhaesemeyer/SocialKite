var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose Schema
var ChallengeSchema = new Schema({
  title: {type: String},
  category: {type: String},
  is_complete: {type: Boolean, default: false}
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
