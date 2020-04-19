const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notification = new Schema({
    content: {
        type: String, 
        required: true,
    }, 
    orderId:{
        type: Number, 
        required: true
    },
    unread: {
        type:Boolean,
        required: false,
        default: true,
    }
}, {
    timestamps: true
});


var UserInfoSchema = new Schema({
    username: {
        type: String, 
        required: true,
    }, 
    phone:{
        type:Number, 
        required: true
    },
    zipcode: {
        type: Number,
        required: true,
    },
    address1: {
        type: String, 
        required: true,
    },
    address2:{
        type: String, 
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    orders: [{type: Schema.Types.ObjectId}],
    notifications: [notification]
});
var UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = UserInfo;