const express=require('express');
const resultController=require('../controllers/result-controller.js');

const routers=express.Router();


routers.get('/results',resultController.displayExams);
routers.get('/student',resultController.displayStudentResult);

module.exports=routers;