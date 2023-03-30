const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const url = require('url');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const authRoute = require('./routes/auth-route.js');
const dashboardRoute = require('./routes/dashboard-route.js');
const questionRoute = require('./routes/question-route.js');
const examRoute = require('./routes/exam-route.js');
const studentRoute = require('./routes/students-route.js');
const resultRoute = require('./routes/result-route.js');
const categoryRoute = require('./routes/category-route.js');
const chartRoute = require('./routes/chart-route.js');
const reportRoute = require('./routes/view-report-route.js');


const auth = require('./middleware/auth-middlware.js');
const queryExecurter = require('./database/dbHelper.js');
const session = require('express-session');
const { alreadyLogin } = require('./controllers/auth-controller.js');
const oneDay = 1000 * 60 * 60 * 24;

const port = process.env.PORT;
const app = express();

//session middleware
app.use(session({
    secret: "rjcoding",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));



//404 page found 


app.get("*", (req, res) => {
    res.render('404.ejs')
    })



app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.use(express.json());

//root
app.use('/',authRoute);

//all routes
app.use('/auth', auth.alreadyLogin, authRoute);
app.use('/dashboard', auth.userAuth, dashboardRoute);
app.use('/question', auth.userAuth, questionRoute);
app.use('/exams', auth.userAuth, examRoute);
app.use('/students', auth.userAuth, studentRoute);
app.use('/result', auth.userAuth, resultRoute);
app.use('/category', auth.userAuth, categoryRoute);
app.use('/chart', auth.userAuth, chartRoute);
app.use('/report', auth.userAuth, reportRoute);

app.use('/user', authRoute);
app.use(express.static(__dirname + "/public"))  

app.listen(3000, () => {
    console.log(`Server is Running on port`);
})

