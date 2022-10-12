const { localsName } = require('ejs');
const Comment = require('../models/comment');
const Post=require('../models/post');
const { post } = require('../routes');

module.exports.create=async function(req,res){
    //console.log(req.body);
    try{
    let post=await Post.findById(req.body.post);
        if(post)
        {
            console.log("got post",post.comments);
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });

            if(req.xhr){
                console.log("xhr hit in comments");
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message:"c0mment Created!"
                })
            }
                //adding comment to post which we got by post id(passed in hidden input)
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
        }
    }catch(err){
        console.log('Error:',err);
        return;
    }

}

module.exports.destroy=async function(req,res){
    try{
    let comment=await Comment.findById(req.params.id)
        if(comment.user==req.user.id)
        {
            let postId=comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
            if(req.xhr)
            {
                return res.status('200').json({
                    data:{
                        comment_id:req.params.id,
                    },
                    message:'comment deleted'            
                })
            }
            return res.redirect('/');
        }
        else{
            return res.redirect('/');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}