const express=require('express');
// const ExamController = require('../controllers/exam-controller');
const examController=require('../controllers/exam-controller');

const routers=express.Router();

routers.get('/create_exam',examController.ExamController.create_exam);
routers.post('/exam_data',examController.ExamController.data);

module.exports=routers;