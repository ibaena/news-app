var request = require('request'),
  cheerio = require('cheerio'),
  mongoose = require('mongoose'),
  News = require('../models/newsmodel.js');


request('https://news.ycombinator.com/', function(error, response, body) {
  if (!error && response.statusCode == 200) {

    $ = cheerio.load(body);

    $('.title').each(function(i, element) {

      var title = $(this).children("a").text();
      var summary = $(this).children("a").text();
      var link = $(this).children("a").attr("href");

      if (title && link) {
        var newNews = News({
          title: title,
          link: link
        });
        newNews.save({
          title: title,
          summary: summary,
          link: link
        }, function(err, saved) {
          if (err) {
            console.log(err);
          } else {
            //console.log(saved);
          }
        });
      }
    });
  }
});
