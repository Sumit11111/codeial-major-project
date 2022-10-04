const express=require('express');
const router=express.Router();
const post_controller=require('../controllers/post_controller');
const passport=require('passport');

router.post('/create',passport.checkUserAuthentication,post_controller.create);
router.get('/destroy/:id',passport.checkUserAuthentication,post_controller.destroy);
module.exports=router;