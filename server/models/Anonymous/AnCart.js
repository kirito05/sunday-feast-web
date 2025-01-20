const mongoose = require('mongoose');



const cartItems = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    totalCartPrice:{
        type:Number,
    }
})

const cartSchema = new mongoose.Schema({
    sessionId:{
        type:String,
        required:true
    },
    cartItems:[cartItems]
})


module.exports = mongoose.model('AnCart',cartSchema);