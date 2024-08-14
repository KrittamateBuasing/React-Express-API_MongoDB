const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    userfile: {
        type:String,
        default: 'emptyprofile.jpg'
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default: "user"
    }
},{timestamps:true })
  
//(name of table , fild)
module.exports = mongoose.model('Users',userSchema)