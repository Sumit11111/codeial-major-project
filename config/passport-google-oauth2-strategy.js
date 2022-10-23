const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
    clientID:"458150551720-dkbfcsakmuh8268kh2m4teft31bdadct.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},
//
function(accessToken,refreshToken,profile,done){
    //console.log(profile);
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in google Strategy-passport",err);
            return ;
        }
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log("error in google Strategy-passport",err);
                    return ;
                }
                return done(null,user);
            });
        }

    })
}
));


module.exports=passport;