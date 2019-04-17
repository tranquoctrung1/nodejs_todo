var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new  Schema({
    text : String,
    isDone: Boolean
})

var todo = mongoose.model('todo',todoSchema)

module.exports = todo;