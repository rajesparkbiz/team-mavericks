const express=require('express');
const authController=require('../controllers/auth-controller.js');

const routers=express.Router();

routers.get('/login',authController.userLogin);
routers.post('/login',authController.userLoginchk);
routers.get('/logout',authController.userLogout);

module.exports=routers;