const e = require('express');
const express=require('express');
const examController=require('../controllers/exam-controller.js');
const filterController=require('../controllers/student-controller.js');

const routers=express.Router();

routers.get('/status',examController.toogleSwitch);
routers.get('/filter-exam',filterController.filterExams);
routers.get('/showExamForm',examController.showExamForm);
routers.post('/chooseQuestions',examController.createExam);
routers.get('/chooseCategoryQuestion',examController.showCategoryQuestion);
routers.post('/CreateQuestionPaper',examController.CreateQuestionPaper);

module.exports=routers;