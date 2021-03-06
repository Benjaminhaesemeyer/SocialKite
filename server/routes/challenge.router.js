var express = require('express');
var router = express.Router();
// load the challenge model
var Challenges = require('../models/challenge.js');
var User = require('../models/user.js');

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

router.put('/', function(req, res) {
  console.log(req);
  User.findByIdAndUpdate(
    {_id: req.user._id},
    {$push: {journey: req.body}},
    function(err, data) {
      if(err) {
        console.log('update error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });

router.put('/new', function(req, res) {
  console.log(req);
  User.findByIdAndUpdate(
    {_id: req.user._id},
    {$push: {userChallenges: req.body}},
    function(err, data) {
      if(err) {
        console.log('update error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
});


router.put('/global', function(req, res) {
  console.log(req);

  var challengeToAdd = req.body;
  // Find the user
  User.findById(req.user._id, function(err, foundUser){

    if(err) {
      console.log('update error: ', err);
      res.sendStatus(500);
    } else {
      // make some edits
      var found = false;
      // 1. Loop through user.globalChallenges to see if they have this challenge
      for (i = 0; i < foundUser.globalChallenges.length; i++) {
        if (foundUser.globalChallenges[i]._id == challengeToAdd._id) {
          // 2. If they do, increase the count of the user.globalChallenges[foundIndex]
          var oldCount = foundUser.globalChallenges[i].count;
          foundUser.globalChallenges[i].count = oldCount + 1;
          foundUser.markModified('globalChallenges');
          found = true;
        }
      }

      // 3. If not found, add it with the count of 0
      // challengeToAdd.count = 1;
      // user.globalChallenges.push(challengeToAdd);
      if(!found){
        challengeToAdd.count = 1;
        foundUser.globalChallenges.push(challengeToAdd);
      }
      console.log('FOUND USER', foundUser);
      // save the user
      foundUser.save(function(err, foundUser){
        if(err) {
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          res.send(foundUser);
        }
      });
    }

  });
});

router.put('/delete', function(req, res) {
  console.log(req);

  User.update(
    {_id: req.user._id},
    {$pull: {"userChallenges": req.body}},
    function(err, data) {
      if(err) {
        console.log('update error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
});


      module.exports = router;
