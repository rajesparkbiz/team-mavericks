const express=require('express');
const questionController=require('../controllers/dashboard-controller.js');

const routers=express.Router();

routers.get('/allQuestions',questionController.userQuestion);
routers.get('/question/data/one',questionController.question);
routers.get('/',questionController.dashboardPage);
routers.get('/exams',questionController.displayExams);


module.exports=routers;