const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth-route.js');
const dashboardRoute = require('./routes/dashboard-route.js');
const questionRoute = require('./routes/question-route.js');
const examRoute = require('./routes/exam-route.js');
const studentRoute = require('./routes/students-route.js');


const queryExecurter=require('./database/dbHelper.js')
const session = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;

const port = process.env.PORT;
const app = express();

//session middleware
app.use(session({
    secret: "rjcoding",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
    }));

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs')
app.use(express.json());

app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/question', questionRoute);
app.use('/exams', examRoute);
app.use('/students', studentRoute);

app.use(express.static(__dirname + "/public"))

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})

