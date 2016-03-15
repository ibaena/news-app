//DEPENDENCIES
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//SCHEMA
var techSchema = new Schema({
  title: String,
  summary: String,
  author: String,
  image : String,
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

var tech = mongoose.model('tech', techSchema);

module.exports = tech;
