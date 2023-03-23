const express=require('express');
require('dotenv').config();
const ejs=require('ejs');
const bodyParser=require('body-parser');
const authRoute=require('./routes/auth-route.js');
const dashboardRoute=require('./routes/dashboard-route.js');
const examRoute = require('./routes/exam-route.js');
const addCategory = require('./routes/add-category.js')
const port=process.env.PORT;
// process.env.PORT  you have ti reset this at office in port varaible
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.set('view engine','ejs')

app.use('/auth',authRoute);
app.use('/dashboard',dashboardRoute);
// app.use('/exam',examRoute);
// app.use('/add',addCategory);
app.use('/category',addCategory);

app.use(express.static(__dirname+"/public"))


app.listen(port,()=>{
    console.log(`Server is Running on ${port}`);
})

