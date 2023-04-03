const express=require('express');
const questionController=require('../controllers/question-controller.js');
const {upload}=require('../config/multer-config.js');
const routers=express.Router();

routers.get('/delete',questionController.deleteQuestion);
routers.post('/update',upload.single('update_filename'),questionController.updateQuestion);
routers.post('/add',upload.single('filename'),questionController.addQuestion);
routers.get('/questions',questionController.displayQuestion);
routers.get('/questions/category',questionController.displayCategoryQuestion);
routers.get('/questions/data/one',questionController.question);
routers.get('/question/selected',questionController.displaySelectedQuestion);
routers.get('/question/discard',questionController.discardChoosedQuestion);
module.exports=routers;