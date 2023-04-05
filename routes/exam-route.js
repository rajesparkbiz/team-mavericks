const e = require('express');
const express=require('express');
const examController=require('../controllers/exam-controller.js');
const filterController=require('../controllers/student-controller.js');

const routers=express.Router();


routers.get('/status',examController.toogleSwitch);
routers.get('/filter-exam',filterController.filterExams);
routers.get('/createExam',examController.createExam);
routers.get('/choosedQuestion',examController.choosedQuestions);
routers.get('/choosed/questions',examController.displaychoosedQuestion);
routers.post('/createExam',examController.addExam);
routers.get('/checkexamname',examController.checkname);
routers.get('/selectQuestions',examController.selectQuestions);
routers.get('/insert/Question',examController.insertSelectQuestions);
routers.get('/displaySelectQuestion',examController.displaySelectQuestion);
routers.get('/delete',examController.deleteExam);

module.exports=routers;