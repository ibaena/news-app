//DEPENDENCIES
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//SCHEMA
var leadSchema = new Schema({
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

var lead = mongoose.model('lead', leadSchema);

module.exports = lead;
