const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth-route.js');
const dashboardRoute = require('./routes/dashboard-route.js');
const questionRoute = require('./routes/question-route.js');
const queryExecurter=require('./database/dbHelper.js')
const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs')
app.use(express.json());

app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/question', questionRoute);


app.use(express.static(__dirname + "/public"))


app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})

