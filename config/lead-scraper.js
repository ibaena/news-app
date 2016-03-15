var request = require('request'),
  cheerio = require('cheerio'),
  mongoose = require('mongoose'),
  lead = require('../models/leadmodel.js');


request('http://www.nytimes.com/section/us?action=click&region=TopBar&pgtype=SectionFront&module=SectionsNav&version=BrowseTree&contentCollection=U.S.&t=qry791', function(error, response, body) {
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
        var newLead = lead({
          title: title,
          summary: summary,
          author: author,
          date: date

        });
        newLead.save({
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
    });
  }
});
