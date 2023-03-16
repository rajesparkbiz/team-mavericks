const express = require('express');
const showCategory = require('../controllers/exam-controller.js');

const routers = express.Router();

routers.get('/showcategory', showCategory.showCategory);

module.exports = routers;

