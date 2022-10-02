const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
},{timestamps:true});

const comment=mongoose.model('comment',commentSchema);

module.exports=comment;