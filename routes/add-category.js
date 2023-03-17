const express = require('express');

const addCategory = require('../controllers/add-category.js');
const verifyCategory = require('../controllers/add-category.js');
const routers = express.Router();

routers.post('/addcategory',addCategory.addCategory);
routers.get('/verifycategory',verifyCategory.verifyCategory);


module.exports = routers;