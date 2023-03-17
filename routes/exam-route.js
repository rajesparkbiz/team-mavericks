const express = require('express');

const showCategory = require('../controllers/exam-controller.js');
const addCategory = require('../controllers/add-category.js');
const verifyCategory = require('../controllers/add-category.js');
const routers = express.Router();

routers.get('/showcategory', showCategory.showCategory);


module.exports = routers;

