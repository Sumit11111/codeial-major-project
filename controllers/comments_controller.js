const Comment = require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    console.log(req.body);
    Post.findById(req.body.post,(err,post)=>{
        if(post)
        {
            console.log("got post",post.comments);
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                //if(err){console.log("Error in adding comment to post...");return;}
                //adding comment to post which we got by post id(passed in hidden input)
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            })
        }
    })
}
