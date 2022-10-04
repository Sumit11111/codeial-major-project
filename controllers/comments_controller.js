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
                //adding comment to post which we got by post id(passed in hidden input)
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
        }
    }catch(err){
        console.log('Error:',err);
    }

}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,(err,comment)=>{
        if(comment.user==req.user.id)
        {
            let postId=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},(err,post)=>{
                return res.redirect('/');
            })

        }
        else{
            return res.redirect('/');
        }
    })
}