const Post=require('../../../models/post');
const Comment=require('../../../models/comment');


module.exports.index=async function(req,res){

    try{
        const post=Post.findById({}).sort('-createdAt').populate('user').populate({path:'comments',populate:{path:'user'}});
        return res.json('200',{
            message:'Posts List',
            posts:post
        })

    }catch(err){
        console.log('******',err);
        return res.json(500,'Internal Server Error');
    }
    
}

module.exports.destroy= async function(req,res){
    try{
        const post=await Post.findById(req.params.id);

        //if(post.user==req.user._id){
            post.remove();

            await Comment.deleteMany({post:req.params._id});

            return res.json(200,{
                message:"Post and associated comments deleted successfully!"
            });
        // }else{
        //     return res.json(401,{
        //         message:"You cann't delete this post"
        //     })  
        // }
    }catch(err){
        console.log('******',err);
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}