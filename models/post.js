const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    //including array of all ids of comments
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }]
},{
    timestamps:true
});

const post=mongoose.model('post',postSchema);

module.exports=post;