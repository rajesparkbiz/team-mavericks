const express=require('express');
const chartController=require('../controllers/chart-controller.js');

const routers=express.Router();


routers.get('/displayPeiChart',chartController.displayChart);
routers.get('/displayTimeLine',chartController.displayTimeLine);


module.exports=routers;

