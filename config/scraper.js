var request = require('request'),
  cheerio = require('cheerio'),
  mongoose = require('mongoose'),
  News = require('../models/newsmodel.js');


request('http://www.nytimes.com/section/science?module=SectionsNav&action=click&version=BrowseTree&region=TopBar&contentCollection=Science&pgtype=Homepage', function(error, response, body) {
  if (!error && response.statusCode == 200) {

    $ = cheerio.load(body);
    title = $(".story-meta");

    title.each(function(i, element) {
      //console.log(element);

      var title = $(this).children('h2').text(),
        summary = $(this).children('.summary').text(),
        author = $(this).children('.byline').text(),
        date = $(this).children('time').text();

      if (title) {
        var newNews = News({
          title: title,
          summary: summary,
          author: author,
          date: date

        });
        newNews.save({
          title: title,
          summary: summary,
          author: author,
          date: date
        }, function(err, saved) {
          if (err) {
            console.log(err);
          } else {
            //console.log(saved);
          }
        });
      }
      return i < 2; //LIMIT FOR TESTING PURPOSE
    });
  }
});
