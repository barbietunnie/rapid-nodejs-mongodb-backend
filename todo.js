var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    created_at: Date,
});

TodoSchema.pre('save', function(next) {
    var todo = this;

    // Get the current Date
    var currentDate = new Date();

    // If created_at doesn't exists, add that to the field
    if(!todo.created_at) {
        todo.created_at = currentDate;
    }

    next();
});

module.exports = mongoose.model('Todo', TodoSchema);