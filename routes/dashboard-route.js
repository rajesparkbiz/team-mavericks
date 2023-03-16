const express=require('express');
const questionController=require('../controllers/dashboard-controller.js');

const routers=express.Router();

routers.get('/questions',questionController.UserQuestion);

module.exports=routers;