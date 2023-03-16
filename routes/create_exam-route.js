const express=require('express');
const examController=require('../controllers/exam-controller');

const routers=express.Router();


routers.get('/create_exam',examController.create_exam);

module.exports=routers;