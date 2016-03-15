var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  tech = require('../models/techmodel'),
  comments = require('../models/notemodel');

//GET ROUTE
router.get('/tech', function(req, res) {
  mongoose.model('tech').find(function(err, news) {
    res.render('tech', {
      title: 'Tech News',
      news: news
    });
  });
});

//GET COMMENTS PER ARTICLE
router.post('/tech/:name', function(req, res) {

  comments.find({
    newsId: req.body._id
  }, function(err, results) {
    if (!err) {
      console.log(results);
      mongoose.model('tech').find(function(err, news) {
        res.render('tech', {
          title: 'Tech News',
          news: news,
          comments: results
        });
      });
    } else {
      throw err;
    }
  });
});

module.exports = router;
