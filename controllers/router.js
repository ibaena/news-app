var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  lead = require('../models/leadmodel'),
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

//DELETE COMMENT BY ID
router.post('/delete', function(req, res) {
  console.log(req.body);
  comments.remove({
    _id: req.body._id
  }, function(err) {
    if (!err) {
      //message.type = 'notification!';
      res.redirect('/');
    } else {
      res.redirect('/error');
    }
  });
});

module.exports = router;
