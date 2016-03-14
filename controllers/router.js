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
    newsId: body.newsId,
    title: body.title,
    body: body.body,
    user: body.user
  });

  news.findByIdAndUpdate(req.body.newsId, {
  $push: {
  comments: [newComments]
  }
  }, { upsert: true },
  function (err, user) {
    if (user){
      newComments.save({
        newsId: body.newsId,
        title: body.title,
        body: body.body,
        user: body.user
      });
      res.redirect('/');
    }else{
      return err;
    }

  }
  );
});

module.exports = router;
