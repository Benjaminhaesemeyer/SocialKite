var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose Schema
var ChallengeSchema = new Schema({
  title: {type: String},
  category: {type: String}
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
