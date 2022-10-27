const mongoose=require('mongoose');

const likeSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        refpath:'onModel'
    },
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;