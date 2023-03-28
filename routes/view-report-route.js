const express=require('express');
const reportController=require('../controllers/student-report-controller.js');

const routers=express.Router();
routers.get('/displayStudentReport',reportController.displayStudentReport);


module.exports=routers;

