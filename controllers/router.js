var express = require('express');
var router = express.Router();

//get routes
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Welcome to High Times',
  });
});

module.exports = router;
