const express=require('express');
const addqueController=require('../controllers/add_que-controller.js');

const routers=express.Router();


routers.get('/add',addqueController.addQuePage);
routers.post('/add',addqueController.addQue);

module.exports=routers;