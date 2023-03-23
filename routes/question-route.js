const express=require('express');
const questionController=require('../controllers/question-controller.js');

const routers=express.Router();

routers.get('/delete',questionController.deleteQuestion);
routers.post('/update',questionController.updateQuestion);
routers.post('/add',questionController.addQuestion);
routers.get('/questions',questionController.displayQuestion);
routers.get('/questions/category',questionController.displayCategoryQuestion);
routers.get('/questions/data/one',questionController.question);
routers.get('/chooseQuestion',questionController.displayChooseQuestion);

module.exports=routers;