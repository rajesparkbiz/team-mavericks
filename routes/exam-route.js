const express = require('express');

const showCategory = require('../controllers/exam-controller.js');
const addCategory = require('../controllers/exam-controller.js');
const verifyCategory = require('../controllers/exam-controller.js');
const routers = express.Router();

routers.get('/showcategory', showCategory.showCategory);

routers.post('/addcategory',addCategory.addCategory);
routers.get('/verifycategory',verifyCategory.verifyCategory);
module.exports = routers;

