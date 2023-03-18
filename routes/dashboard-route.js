const express=require('express');
const questionController=require('../controllers/dashboard-controller.js');

const routers=express.Router();

routers.get('/allQuestions',questionController.userQuestion);
routers.get('/question/data/one',questionController.question);

module.exports=routers;