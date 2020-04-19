const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UpdatesSchema = new Schema({
    content: {
        type: String, 
        required: true,
    }, 
    name:{
        type: String, 
        required: false
    },
    
}, {
    timestamps: true
});

var Updates = mongoose.model('Updates', UpdatesSchema);

module.exports = Updates;