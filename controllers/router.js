var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  news = require('../models/newsmodel');
  comments = require('../models/notemodel');

//get routes
router.get('/', function(req, res) {
  mongoose.model('news').find(function(err, news) {
    res.render('index', {
      title: 'Welcome to High Times',
      news: news
    });
  });
});


//POST COMMENT
router.post('/comment', function(req, res) {
  var body = req.body;
console.log(body);
  var newComments = comments({
    title: body.title,
    body: body.body,
    user: body.user
  });

  newComments.save(function(err, newPost) {
    if (err) return console.error(err);
    res.redirect('/');
  });
});

module.exports = router;
