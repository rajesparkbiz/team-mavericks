const express=require('express');
const resultController=require('../controllers/result-controller.js');

const routers=express.Router();


routers.get('/results',resultController.displayExams);

module.exports=routers;