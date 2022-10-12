const Post=require('../models/post');
const Comment=require('../models/comment')

module.exports.create= async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })

        if(req.xhr){
            console.log("xhr hit");
            req.flash('success','Post Published!');
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            })
        }

        req.flash('success','Post Published!');
        return res.redirect('back');
    }catch(err){
        req.flash('error','Error in post creation');
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

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:"Post Deleted"
                    })
                }

                req.flash('success','post and associated comments deleted');
                return res.redirect('/');
            }
            //comments empty means no need to delete just redirect to same page
            else{
                req.flash('error','Error in deleting post and comments');
                return res.redirect('/');}
        }
        else{return res.redirect('/');}
    }catch(err){
        console.log('Error:',err);
        return;
    }
}

