const express=require('express');
const passport = require('passport');
const router=express.Router();
const users_controller=require('../controllers/user_controller');

//route to profile without using passprt authentication
router.get('/profile',users_controller.profile);

//route to profile with passport authentication
router.get('/proofile',passport.checkUserAuthentication,users_controller.profile)


router.get('/sign-up',users_controller.signUp);
router.get('/sign-in',users_controller.signIn);



router.post('/create',users_controller.create);
//manual authentication route to controller action
// router.post('/create-session', users_controller.createSession);

//Authentication using passport and express-session
router.post('/create-session',
passport.authenticate('local',{failureRedirect: '/users/sign-in'}),
users_controller.createSession)

//used to sign out
router.get('/sign-out',users_controller.destroySession);

module.exports=router;