var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  lead = require('../models/leadmodel'),
  news = require('../models/newsmodel'),
  comments = require('../models/notemodel');

//GET ROUTE
router.get('/lead', function(req, res) {
  mongoose.model('lead').find(function(err, news) {
    res.render('lead', {
      title: 'Lead News',
      news: news
    });
  });
});

//GET COMMENTS PER ARTICLE
router.post('/lead/:name', function(req, res) {

  comments.find({
    newsId: req.body._id
  }, function(err, results) {
    if (!err) {
      console.log(results);
      mongoose.model('lead').find(function(err, news) {
        res.render('lead', {
          title: 'Lead News',
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
