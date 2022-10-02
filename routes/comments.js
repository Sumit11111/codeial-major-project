const express=require('express');
const router=express.Router();
const comments_controller=require('../controllers/comments_controller');
const passport=require('passport');

router.post('/create',passport.checkUserAuthentication,comments_controller.create);

module.exports=router;