const User=require('../models/user');

module.exports.profile=function(req,res){
    res.render('users',{
        title:"Users"
    })
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