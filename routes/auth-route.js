const express=require('express');
const authController=require('../controllers/auth-controller.js');

const routers=express.Router();


routers.get('/',authController.login);
routers.get('/login',authController.userLogin);
routers.post('/login',authController.userLoginchk);
routers.get('/logout',authController.userLogout);
routers.get('/forgot',authController.forgotPass);
routers.get('/changePassword/:ftoken',authController.changePassword);
routers.post('/changePassword',authController.changePasswordChk);

module.exports=routers;

