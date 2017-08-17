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
//
// router.get('/journey', function(req, res){
//   User.find({}, function(err, data) {
//     console.log('inside Challenge GET route');
//     if(err) {
//       console.log('find error:', err);
//       res.sendStatus(500);
//     } else {
//       res.send(data);
//     }
//   });
// });

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



    // delete a challenge by targeting a specific _id
    router.delete('/:id', function(req, res) {
      Challenges.remove({
        _id : req.params.id
      }, function(err, remove) {
        console.log('inside Challenge GET route');
        if(err) {
          console.log('find error:', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    });

    module.exports = router;
