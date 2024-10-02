const mongoose=require("mongoose");
const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        reuired:true,
    },
    content:{
        type:String,
        required:true,
    },
    labels:{
        type:[String],
        default:[]
    },
    background_color:{
        type:String
    },
    pinned:{
        type:Boolean,
        default:false
    },
    completed:{
        type:Boolean,
        default:false
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
})