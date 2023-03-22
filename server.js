const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth-route.js');
const dashboardRoute = require('./routes/dashboard-route.js');
const questionRoute = require('./routes/question-route.js');
const examRoute = require('./routes/exam-route.js');
const studentRoute = require('./routes/students-route.js');
const userAuthMiddlware = require('./middleware/auth-middlware');


const queryExecurter=require('./database/dbHelper.js')
const session = require('express-session');
const auth = require('./middleware/auth-middlware');
// const oneDay = 1000 * 60 * 60 * 24;

const port = process.env.PORT;
const app = express();

//session middleware
app.use(session({
    secret: "rjcoding",
    saveUninitialized:true,
    resave: true
    }));

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs')
app.use(express.json());
app.use('/auth',userAuthMiddlware.alreadyLogin,authRoute);
app.use('/dashboard',userAuthMiddlware.userAuth, dashboardRoute);
app.use('/question',userAuthMiddlware.userAuth, questionRoute);
app.use('/exams',userAuthMiddlware.userAuth, examRoute);
app.use('/students',userAuthMiddlware.userAuth, studentRoute);
app.use('/user',authRoute);
app.use(express.static(__dirname + "/public"))
app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})

