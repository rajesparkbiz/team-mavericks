
const express=require('express');
const questionController=require('../controllers/question-controller');
const routers=express.Router();
routers.get('/question',questionController.question)
routers.post('/addcategory',questionController.addCategory)
module.exports=routers;