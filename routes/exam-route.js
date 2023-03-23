const express=require('express');
const examController=require('../controllers/exam-controller.js');
const filterController=require('../controllers/student-controller.js');

const routers=express.Router();


routers.get('/status',examController.toogleSwitch);
routers.get('/filter-exam',filterController.filterExams);
routers.get('/createExam',examController.createExam);
routers.get('/choosedQuestion',examController.choosedQuestions);

module.exports=routers;