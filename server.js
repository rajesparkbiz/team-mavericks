const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth-route.js');
const dashboardRoute = require('./routes/dashboard-route.js');
const questionRoute = require('./routes/question-route.js');
const examRoute = require('./routes/exam-route.js');
const studentRoute = require('./routes/students-route.js');
const resultRoute = require('./routes/result-route.js');
const categoryRoute = require('./routes/category-route.js');


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

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')
app.use(express.json());

app.use('/auth',auth.alreadyLogin,authRoute);
app.use('/dashboard',auth.userAuth,dashboardRoute);
app.use('/question', auth.userAuth,questionRoute);
app.use('/exams',auth.userAuth,examRoute);
app.use('/students',auth.userAuth,studentRoute);
app.use('/result',auth.userAuth,resultRoute);
app.use('/category',auth.userAuth,categoryRoute);


app.use('/user',authRoute);
app.use(express.static(__dirname + "/public"))

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})

