const Like = require('../models/like');
const Comment=require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike=async function(req,res){
    try{

        //likes/toggle/?id=abcd&type=Post
        let likeable;
        let deleted=false;

        if(req.query.type=='Post')
        {
            likeable=await Post.findById(req.query.id).populate('likes');
        }else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exist and store it
        let existingLike=await Like.findOne({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        });

        //if exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
        }else{
            //create new like and push that
            let newLike=await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200,{
            message:"Request Successful!",
            data:{
                deleted:deleted
            }
        });

    }catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}