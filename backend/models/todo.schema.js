const mongoose=require("mongoose");
const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
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
    },
}
,{
    timestamps: true, // creates createdAt and updatedAt fields automatically
})
const Todo=mongoose.model('Todo',todoSchema);
module.exports = Todo;