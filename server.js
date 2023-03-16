const express=require('express');
require('dotenv').config();
const ejs=require('ejs');
const bodyParser=require('body-parser');
const authRoute=require('./routes/auth-route.js');
const port=process.env.PORT;
const app=express();

app.set('view engine','ejs')

app.use('/auth',authRoute);
app.use(express.static(__dirname+"/public"))

app.listen(port,()=>{
    console.log(`Server is Running on ${port}`);
})

