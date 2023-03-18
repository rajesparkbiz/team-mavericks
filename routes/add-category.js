const express = require('express');

const addCategory = require('../controllers/add-category.js');
const verifyCategory = require('../controllers/add-category.js');
const showCategory = require('../controllers/add-category.js');

const routers = express.Router();

routers.get('/addcategory',addCategory.addCategory);
routers.get('/verifycategory',verifyCategory.verifyCategory);
routers.get('/showcategory', showCategory.showCategory);


module.exports = routers;