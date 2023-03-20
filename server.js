var mysql = require('mysql2');
var express = require('express');
var app = express();
var utils = require('util')
var bodyParser = require('body-parser');
const ejs = require('ejs');
const res = require('express/lib/response');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
var connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'exam_admin'
    
});

const queryExecutor = (query) => {
    return new Promise((resolve, rejects) => {
        connection.query(query, (err, result) => {
            resolve(result);
        });
    })
}

app.get('/dashboard', async (req, res) => {
    res.render('index.ejs');
})

app.get('/users', async (req, res) => {
    var student_master = await queryExecutor(`SELECT * FROM student_master`);
    res.render('user.ejs', { data: student_master });

})

app.get('/exam', async (req, res) => {
    var exam_master = await queryExecutor(`SELECT * FROM exam_master`);
    res.render('exam.ejs', { data: exam_master });
})

app.get('/exam/update', async (req, res) => {

    const currentStatus = await queryExecutor(`SELECT exam_master.exam_isActive as status FROM exam_admin.exam_master where exam_master.exam_id=1`);


    const isActive = currentStatus[0].status;

    var query;
    if (isActive == 'yes') {

        query = `update exam_master set exam_isActive = 'no' where exam_id=${req.query.id}`;

    } else {
        query = `update exam_master set exam_isActive = 'yes' where exam_id=${req.query.id}`;
    }

    const toogleSwitchQuesry = await queryExecutor(query);
    res.redirect('/exam');

})

app.listen(3000, function () {
    console.log('Connected  on port 3000');
})


 