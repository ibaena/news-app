//DEPENDENCIES
var mongoose = require('mongoose');
Schema = mongoose.Schema;

//SCHEMA
var NoteSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
