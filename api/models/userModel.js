var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        required: true
    },
    lists: [{
        type: Schema.ObjectId,
        ref: 'List'
    }]
})

module.exports = Mongoose.model('User', User);