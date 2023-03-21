const express=require('express');
const questionController=require('../controllers/question-controller.js');

const routers=express.Router();

routers.get('/delete',questionController.deleteQuestion);
routers.post('/update',questionController.updateQuestion);
routers.post('/add',questionController.addQuestion);

module.exports=routers;