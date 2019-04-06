const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Crud-React', (err) => {
    if(!err)
        console.log('MongoDB connection succeeded');
    else
        console.log('error in connection' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;
