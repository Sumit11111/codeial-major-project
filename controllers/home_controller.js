const Post=require('../models/post');

module.exports.home=function(req,res){
    // Post.find({},(err,posts)=>{
    //     return res.render('home',{
    //         title: "home",
    //         userPosts:posts
    //     });
    // })

    //populate user for each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user',
            
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title:"Codieal | Home",
            userPosts:posts
        })
    })
    
}