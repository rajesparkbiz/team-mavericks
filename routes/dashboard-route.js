const express=require('express');
const questionController=require('../controllers/dashboard-controller.js');

const routers=express.Router();

routers.get('/',questionController.dashboardPage);
routers.get('/exams',questionController.displayExams);


module.exports=routers;