const Post=require('../models/post');
const Comment=require('../models/comment')

module.exports.create= async function(req,res){
    console.log('inside post controller to create post');
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        return res.redirect('back');
    }catch(err){
        console.log('Error:',err);
        return;
    }
}

module.exports.destroy=async function(req,res){
    try{
    let post =await Post.findById(req.params.id);
        if(post.user==req.user.id)
        {
            post.remove();
            //comments not empty
            if(post.comments){
                await Comment.deleteMany({post:req.params.id});
                return res.redirect('/');
            }
            //comments empty means no need to delete just redirect to same page
            else{return res.redirect('/');}
        }
        else{return res.redirect('/');}
    }catch(err){
        console.log('Error:',err);
    }
}

