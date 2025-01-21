const mongoose = require('mongoose');


const address = new mongoose.Schema({
    AddressLine1:{
        type:String,
        required:true,
        maxLength:100
    },
    AddressLine2:{
        type:String,
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    defaultAddress:{
        type:Boolean,
        default:false
    }
})

const cartItem = new mongoose.Schema({
    ProductId:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        default:1,
    }
})

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    AddressBook:[address],
    Cart:[cartItem]
})


module.exports = mongoose.model('User',userSchema);