//DEPENDENCIES
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
var newsSchema = new Schema({
  title: String,
  summary: String,
  author: String,
  comments: [{
    newsId: String,
    user: String,
    title: String,
    body: String,
    date: {
      type: String,
      date: { type: Date, default: Date.now }
    }
  }]
});

var news = mongoose.model('news', newsSchema);

module.exports = news;
