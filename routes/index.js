const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');

console.log('router loaded');

//home route
router.get('/',home_controller.home);
router.use('/users',require('./users'));
router.use('/users',require('./userPost'));

module.exports=router;