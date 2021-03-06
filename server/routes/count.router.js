var express = require('express');
var router = express.Router();
// load the challenge model
var Challenges = require('../models/challenge.js');
var User = require('../models/user.js');

  router.put('/new', function(req, res) {
    console.log('This is what were looking for', req.body);
    User.findOneAndUpdate(
      {"_id": req.user._id, "userChallenges.title": req.body.title},
      {$set: {"userChallenges.$.count":req.body.count,"userChallenges.$.date":req.body.date}},
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
