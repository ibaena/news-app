//DEPENDENCIES
var mongoose = require('mongoose');
Schema = mongoose.Schema;

//SCHEMA
var NoteSchema = new Schema({
  title: String,
  body: {
    type: String
  },
  user: String,
  date: { type: Date, default: Date.now }

});

var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
