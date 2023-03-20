const express=require('express');
require('dotenv').config();
const ejs=require('ejs');
const authRoute=require('./routes/auth-route.js');
const dashboardRoute=require('./routes/dashboard-route.js');
const addqueRoute=require('./routes/add-que.js');
const port=process.env.PORT;
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
const session = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
//session middleware

app.use(session({
secret: "shhh....",
saveUninitialized:true,
cookie: { maxAge: oneDay },
resave: false
}));

app.use('/auth',authRoute);
app.use('/dashboard',dashboardRoute);
app.use('/que',addqueRoute);
app.use(express.static(__dirname+"/public"))

app.listen(port,()=>{
    console.log(`Server is Running on ${port}`);
})

