var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose Schema
var ChallengeSchema = new Schema({
  title: {type: String},
  category: {type: String},
  count: {type: Number, default: 0}
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
