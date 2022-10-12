const Post=require('../models/post');
const User=require('../models/user');

module.exports.home= async function(req,res){
    
    try{
    //populate user for each post
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user',
            
        }
    })
    //finding users in await manner
    let users=await User.find({});

    return res.render('home',{
        title:"Codieal | Home",
        userPosts:posts,
        all_users:users
        });
    }catch(err)
    {
        console.log('Error:',err);
        return;
    }

    
}