var express = require('express');
var router = express.Router();
// load the challenge model
var Challenges = require('../models/challenge.js');

// handles Ajax request for Challenge information
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
});
// adding a challnge to the collection
router.post('/', function(req, res){
  // create a new challenge
  Challenges.create({
    title : req.body.title,
    category : req.body.category,
  }, function(err, post) {
    console.log('inside Challenge GET route');
    if(err) {
      console.log('find error:', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});
// delete a challenge by targeting a specific _id
router.delete('/:challenge_id', function(req, res) {
  Challenges.remove({
    _id : req.params.challenge_id
  }, function(err, challenge) {
    if (err)
    res.send(err);
    // get and return all the challenges
    Challenges.find({}, function(err, data) {
      console.log('inside Delete challenge route');
      if(err) {
        console.log('find error:', err);
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    });
  });
});

module.exports = router;
