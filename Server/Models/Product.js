const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    detail:{
        type:String
    },
    price:{
        type:Number
    },
    file: {
        type:String,
        default: 'emptyprofile.jpg'
    }
},{timestamps:true })

//(name of table , fild)
module.exports = mongoose.model('products',productSchema)