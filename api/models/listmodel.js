var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var List = new Schema({
    name: {
        type: String,
        required: true
    },
    cards: [{
        title: {
            type: String,
            required: true
        }
    }]
})

module.exports = Mongoose.model('List', List);