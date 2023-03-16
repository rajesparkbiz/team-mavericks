const express=require('express');
const authController=require('../controllers/auth-controller.js');

const routers=express.Router();


routers.get('/login',authController.userLogin);

module.exports=routers;