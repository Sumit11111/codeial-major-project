const Post=require('../models/post');

module.exports.create=function(req,res){
    console.log('inside post contrller to create post');
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log("error in creating post");
    return;}
        console.log("..............................................");
        return res.redirect('back');
    })
}

