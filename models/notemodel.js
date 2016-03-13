//SET MODEL FOR USER INPUT
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//SCHEMA
var NoteSchema = new Schema({
  title: {
    type:String
  },
  body: {
    type:String
  }
});

var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
