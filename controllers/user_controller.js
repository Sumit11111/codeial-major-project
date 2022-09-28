const cookieParser = require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const { modules } = require('../config/mongoose');
const User=require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,(err,user)=>{
            if(user){
                console.log(user);
                return res.render('users',{
                    title:"user | Profile",
                    user:user
                })
            }
            else{
                return res.redirect('/users/sign-in');
            }
        })
    }else{
    return res.redirect('/users/sign-in');}

}

module.exports.signIn=function(req,res){
    res.render('signIn',{
        title:"codeial | Sign In"
    })
}

module.exports.signUp=function(req,res){
    res.render('signUp',{
        title:"Codeial | Sign Up"
    })
}

module.exports.create=function(req,res){
    //console.log(req.body);
    if(req.body.password!=req.body.confirm_password)
    {
        console.log("password not match with confirm password");
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        //console.log("new user created....");
        if(err){
            console.log("User already exist...");
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("Error in creating user while signing up...");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            res.redirect('back');
        }
    })

    
}

module.exports.createSession=function(req,res){
    //finding user in db by email
    //console.log("session creation...");
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log("error in finding user in db...");
            return;
        }
        if(user)
        {
            //console.log("user found....");
            //password matching condition
            if(user.password==req.body.password)
            {
                //console.log("creating cookie...");
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');

            }
            //mistach condition
            console.log("password mismatch");
            return res.redirect('back');
        }
        else{
            
                //user not found
                // console.log("user not found...");
                return res.redirect('back');
            
        }
    })
    
    
}