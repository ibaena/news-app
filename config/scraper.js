var request = require('request');
var cheerio = require('cheerio');
var news = require('../models/newsmodel.js');


request('https://news.ycombinator.com/', function(error, response, body) {
  if (!error && response.statusCode == 200) {

    $ = cheerio.load(body);

    $('.title').each(function(i, element) {

      var title = $(this).children("a").text();
      var link = $(this).children("a").attr("href");

      if (title && link) {
				var newNews = news ({
					title: title,
					link: link
				});
        newNews.save({
          title: title,
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
