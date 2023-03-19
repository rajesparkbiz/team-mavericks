const express = require('express');

const addCategory = require('../controllers/add-category.js');
const verifyCategory = require('../controllers/add-category.js');
const showCategory = require('../controllers/add-category.js');

const routers = express.Router();

routers.get('/addCategory',addCategory.addCategory);
routers.get('/verifyCategory',verifyCategory.verifyCategory);
routers.get('/showCategory', showCategory.showCategory);


module.exports = routers;