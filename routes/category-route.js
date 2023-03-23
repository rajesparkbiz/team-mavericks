const express=require('express');
const categoryController=require('../controllers/category-controller.js');

const routers=express.Router();

routers.get('/addCategory',categoryController.addCategory);
routers.get('/verifyCategory',categoryController.verifyCategory);
routers.post('/editCategory',categoryController.editCategory);
routers.get('/showCategory', categoryController.showCategory);
routers.post('/deleteCategory', categoryController.deleteCategory);

module.exports=routers;