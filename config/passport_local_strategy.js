const passport=require('passport');

const Local_Strategy=require('passport-local').Strategy;

const User=require('../models/user');

passport.use(new Local_Strategy({usernameField:'email',passReqToCallback:true},
    function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',"Error in finding user....passport");
            return done(err);
        }
        if(!user){
            req.flash('error',"user not found");
            return done(null,false);
        }
        if(user.password!=password){
            req.flash('error',"Invalid password");
            return done(null,false);
        }
        return done(null,user);
    })
}))

//required from browser to server
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//required from server to browser
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err);
        }
        return done(null,user);
    })
})

//check user authentication
passport.checkUserAuthentication=(req,res,next)=>{
    if(req.isAuthenticated())
    return next();
    else
    return res.redirect('/users/sign-in');
}

//req.user contains the current signed in user from session cookie and we r sending it to locals for view
passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated())
    res.locals.user=req.user;

    next();
    
}

module.exports=passport;