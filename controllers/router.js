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

//GET COMMENTS PER ARTICLE
router.post('/comments/:name', function(req, res) {

  comments.find({
    newsId: req.body._id
  }, function(err, results) {
    if (!err) {
      console.log(results);
      mongoose.model('news').find(function(err, news) {
        res.render('index', {
          title: 'Welcome to High Times',
          news: news,
          comments: results
        });
      });
    } else {
      throw err;
    }
  });
});

//POST COMMENT
router.post('/post', function(req, res) {
  var body = req.body;

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
    }, {
      upsert: true
    },
    function(err, user) {
      if (user) {
        newComments.save({
          newsId: body.newsId,
          title: body.title,
          body: body.body,
          user: body.user
        });
        res.redirect('/');
      } else {
        return err;
      }

    }
  );
});

module.exports = router;
