const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth-route.js');
const dashboardRoute = require('./routes/dashboard-route.js');
const queryExecurter=require('./database/dbHelper.js')
const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs')

app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

app.use(express.static(__dirname + "/public"))


app.get('/question/data/one', async (req, res) => {
    const id = req.query.id;

    const questionData = await queryExecurter(`SELECT * FROM exam_admin.question_master where question_master.question_id=${parseInt(id)}`);

    const questionoption=await queryExecurter(`SELECT option_master.option_id,option_master.option_value FROM exam_admin.option_master where option_master.question_id=${parseInt(id)}`);

    res.json({ questionData:questionData[0],questionOption:questionoption});
})

app.post('/question/update',(req,res)=>{
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})

