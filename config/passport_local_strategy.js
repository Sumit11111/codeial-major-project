const passport=require('passport');

const Local_Strategy=require('passport-local').Strategy;

const User=require('../models/user');

passport.use(new Local_Strategy({usernameField:'email'},
    function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("Error in finding user....passport");
            return done(err);
        }
        if(!user){
            console.log("user not found");
            return done(null,false);
        }
        if(user.password!=password){
            console.log("Invalid password");
            return done(null,false);
        }
        return done(null,user);
    })
}))

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err);
        }
        return done(null,user);
    })
})

module.exports=passport;