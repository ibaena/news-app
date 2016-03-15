var request = require('request'),
  cheerio = require('cheerio'),
  mongoose = require('mongoose'),
  tech = require('../models/techmodel.js');


request('http://www.nytimes.com/pages/technology/personaltech/index.html', function(error, response, body) {
  if (!error && response.statusCode == 200) {

    $ = cheerio.load(body);
    title = $(".story");

    title.each(function(i, element) {


      var title = $(this).children('h3').text(),
        summary = $(this).children('.summary').text(),
        author = $(this).children('.byline').text();

      if (title) {
        var newTech = tech({
          title: title,
          summary: summary,
          author: author,

        });
        newTech.save({
          title: title,
          summary: summary,
          author: author
        }, function(err, saved) {
          if (err) {
            console.log(err);
          } else {
            console.log(saved);
          }
        });
      }
    });
  }
});
