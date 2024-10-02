const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    },
    password:{
        type:String,
        required:true,
        minlength:8,
       // select:false,//removes password from query
    }
   
},{
    timestamps: true, // creates createdAt and updatedAt fields automatically
})
const User=mongoose.model('User',userSchema);
module.exports = User;