const express=require('express');
const authController=require('../controllers/auth-controller.js');
// const mailSender=require('../controllers/mailsender.js');

const routers=express.Router();


routers.get('/login',authController.userLogin);
routers.post('/login',authController.userLoginchk);

module.exports=routers;