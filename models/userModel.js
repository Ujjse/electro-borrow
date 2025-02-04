const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        unique: false
    },
    lname: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('users', userSchema)