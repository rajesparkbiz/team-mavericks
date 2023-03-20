const express=require('express');
require('dotenv').config();
const ejs=require('ejs');
const bodyParser=require('body-parser');
const authRoute=require('./routes/auth-route.js');
const dashboardRoute=require('./routes/dashboard-route.js');
const create_examRoute = require('./routes/create_exam-route.js');
const port=process.env.PORT;
const app=express();

app.set('view engine','ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/auth',authRoute);
app.use('/dashboard',dashboardRoute);
app.use('/create_exam',create_examRoute);
// app.use('/exam',create_examRoute);

app.use(express.static(__dirname+"/public"));


// app.get('/nextpage',(req,res)=>{
//     conn.query(`select question, question_answer from question`,(err,data)=>{
//         if(err) throw err
//         res.render('')
//     })
// })
app.listen(port,()=>{
    console.log(`Server is Running on ${port}`);
})

