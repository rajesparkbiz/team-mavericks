const express=require('express');
const studentController=require('../controllers/student-controller.js');

const routers=express.Router();


routers.get('/data',studentController.displayStudentData);
routers.get('/filter',studentController.filterExams);
routers.get('/student-filter',studentController.filterStudent);


module.exports=routers;