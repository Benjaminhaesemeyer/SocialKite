var express = require('express');
var router = express.Router();
// load the challenge model
var Challenges = require('../models/challenge.js');

router.put('/', function(req, res) {
  console.log('count put route working', req.body);
  Challenges.findByIdAndUpdate(
    req.body._id,
    {$set: {count: req.body.count}},
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
