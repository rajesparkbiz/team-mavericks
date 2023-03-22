const express = require('express');

const addCategory = require('../controllers/add-category.js');
const verifyCategory = require('../controllers/add-category.js');
const showCategory = require('../controllers/add-category.js');
const editcategory = require('../controllers/add-category.js');
const deletecategory = require('../controllers/add-category.js');


const routers = express.Router();

routers.get('/addCategory',addCategory.addCategory);
routers.get('/verifyCategory',verifyCategory.verifyCategory);
routers.post('/editCategory',editcategory.editCategory);
routers.get('/showCategory', showCategory.showCategory);
routers.post('/deleteCategory', deletecategory.deleteCategory);


module.exports = routers;