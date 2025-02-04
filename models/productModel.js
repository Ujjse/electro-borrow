const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    
    productDescription:{
        type: String,
        required: true,
        maxLength: 2000

    },

 
    productImage: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
});

module.exports= mongoose.model('Product', productSchema)
