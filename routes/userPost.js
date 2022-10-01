const express=require('express');
const router=express.Router();
const post_controller=require('../controllers/post_controller');
const passport=require('passport');

router.post('/create',passport.checkUserAuthentication,post_controller.create);

module.exports=router;