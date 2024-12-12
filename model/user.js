const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    passoword:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['user','student', 'admin'],
    }
    
})
module.exports = mongoose.model("User", userSchema);