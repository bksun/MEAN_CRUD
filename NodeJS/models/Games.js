const mongoose = require('mongoose');

var Games = mongoose.model('Games', {
    title: { type: String },
    cover: { type:String }
});

module.exports = { Games };