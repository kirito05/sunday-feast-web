const e = require('express');
const mongoose = require('mongoose');


const memberSchema = new mongoose.Schema({
    AdminId:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    PhoneNumber:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Member', memberSchema);
