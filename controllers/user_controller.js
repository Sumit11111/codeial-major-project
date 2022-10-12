const { modules } = require('../config/mongoose');
const User=require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,(err)=>{
                if(err){console.log('*****Multer Error',err);}
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))       
                    }
                    //avatar field value updating in User schema
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }

                user.save();
                return res.redirect('/');
            })
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}


module.exports.profile=function(req,res){
    User.findById(req.params.id,(err,user)=>{
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        })
    })
}
//profile access manually
// module.exports.profile=function(req,res){
//     if(req.cookies.user_id)
//     {
//         User.findById(req.cookies.user_id,(err,user)=>{
//             if(user){
//                 console.log(user);
//                 return res.render('users',{
//                     title:"user | Profile",
//                     user:user
//                 })
//             }
//             else{
//                 return res.redirect('/users/sign-in');
//             }
//         })
//     }else{
//     return res.redirect('/users/sign-in');}
// }

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('signIn',{
        title:"codeial | Sign In"
    })
}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('signUp',{
        title:"Codeial | Sign Up"
    })
}

module.exports.create=async function(req,res){
    //password and confirm password should match
    if(req.body.password!=req.body.confirm_password)
    {
        console.log("password not match with confirm password");
        return res.redirect('back');
    }
    try{
    let user=await User.findOne({email:req.body.email});
    if(!user)
    {
        await User.create(req.body);
        return res.redirect('/users/sign-in');
    }
    else{res.redirect('back');}
    }catch(err){
        console.log('Error',err);
        return;
    }
}

//Manual authentication without encryption
// module.exports.createSession=function(req,res){
//     //finding user in db by email
//     //console.log("session creation...");
//     User.findOne({email:req.body.email},function(err,user){
//         if(err)
//         {
//             console.log("error in finding user in db...");
//             return;
//         }
//         if(user)
//         {
//             //console.log("user found....");
//             //password matching condition
//             if(user.password==req.body.password)
//             {
//                 //console.log("creating cookie...");
//                 res.cookie('user_id',user.id);
//                 return res.redirect('/users/profile');
//             }
//             //mistach condition
//             console.log("password mismatch");
//             return res.redirect('back');
//         }
//         else{
//                 //user not found
//                 // console.log("user not found...");
//                 return res.redirect('back');   
//         }
//     })
// }

//Authentication using passport and express-session
module.exports.createSession=function(req,res)
{
    req.flash('success','Logged In Successfully!');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res,next){
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success','Logged Out Successfully!');
        res.redirect('/');
    });
}