const express=require('express');
const resultController=require('../controllers/result-controller.js');

const routers=express.Router();

routers.get('/student',resultController.displayStudentResult);
routers.get('/student/report',resultController.displayStudentExamsReport);

module.exports=routers;