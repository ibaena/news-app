var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  news = require('../models/newsmodel');

//get routes
router.get('/', function(req, res) {
  mongoose.model('news').find(function(err, news) {
    res.render('index', {
      title: 'Welcome to High Times',
      news: news
    });
  });
});

module.exports = router;
