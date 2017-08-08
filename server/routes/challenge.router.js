var express = require('express');
var router = express.Router();
var Challenges = require('../models/challenge.js');

// Handles Ajax request for Challenge information
router.get('/', function(req, res) {
  // find (select) all documents in our challenge collection
  Challenges.find({}, function(err, data) {
    console.log('inside Challenge GET route');
    if(err) {
      console.log('find error:', err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});//end GET for Challenges

module.exports = router;
