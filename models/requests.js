const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var shoppingItem = new Schema({
    item: {
        type: String, 
        required: true,
    }, 
    quantity:{
        type:Number, 
        required: true
    }
});

var requestSchema = new Schema ({
    buyerId:{
        type: Schema.Types.ObjectId,
        required: false, //should be true, will change it later
    },
    driverId:{
        type: Schema.Types.ObjectId,
        required: false, //should be true, will change it later,
        default: null,
    },
    buyerName: {
        type: String, 
        required: false, //should be true, will change it later
    },
    driverName: {
        type: String, 
        required: false, //should be true, will change it later
    },
    typeErrand: {
        type: String, 
        required: false, //should be true, will change it later
    },
    store: {
        type: String,
        required : false, //should be true, will change it later
    },
    zipcode: {
        type: Number,
        required: false, //should be true, will change it later
    },
    buyerDate: {
        type: Date, //Date
        required: false, //should be true, will change it later
    },
    address1: {
        type: String, 
        required: false, //should be true, will change it later
    },
    address2:{
        type: String, 
        required: false, //should be true, will change it later
    },
    city: {
        type: String,
        required: false, //should be true, will change it later
    },
    numItems: {
        type: Number, 
        required: false, //should be true, will change it later
    },
    driverPhone: {
        type:Number, 
        required: false, //should be true, will change it later
    },
    driverDate:{
        type: Date,//Date 
        required: false, //should be true, will change it later
    },
    note: {
        type: String, 
        required: false,
    },
    thankyounote: {
        type:String, 
        required: false,
    },
    priority: {
        type: Boolean,
        required: false, //should be true, will change it later
    },
    venmo:{
        type: Boolean,
        required: false, //should be true, will change it later
    },
    cash:{
        type: Boolean,
        required: false, //should be true, will change it later
    },
    buyerPhone:{
        type:Number, 
        required: false, //should be true, will change it later
    },
    shoppingList:[shoppingItem]
}, {
    timestamps: true
});



var notifications = new Schema({
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


// var Dishes = mongoose.model('Dish', dishSchema);
var Requests = mongoose.model('Requests', requestSchema);

module.exports = Requests;