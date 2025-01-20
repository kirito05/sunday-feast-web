const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 0
    },
    inventory:{
        type:String,
        enum: ["In Stock", "Out of Stock"],
        default: "In Stock"
    },
    photo:{
        type:String,
    },
    baseWeight:{
        type: Number,
        default: 500
    },
    ProductId:{
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model("Product", productSchema)