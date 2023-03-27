const express=require('express');
const chartController=require('../controllers/chart-controller.js');

const routers=express.Router();


routers.get('/display',chartController.displayChart);


module.exports=routers;

