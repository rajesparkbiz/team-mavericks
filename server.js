const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql2 = require('mysql2');
const { ejs } = require('ejs');
var http = require('http');
const { connect } = require('http2');

app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs');
const con = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'exam_admin'
});

con.connect();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// ..........................queryExecutor...............................

const queryExecutor = (query) => {

    return new Promise((resolve, reject) => {

        con.query(query, (err, result) => {
            resolve(result);
        });
    })
}

app.get('/dashboard', async (req, res) => {

    var data = [];

    var categories = await queryExecutor(`select count(*) as totalCategories from exam_admin.question_category`);
    data[0] = categories[0].totalCategories;

    var exam = await queryExecutor(`select count(*) as exams from exam_admin.exam_master`);
    data[1] = exam[0].exams;

    var que = await queryExecutor(`select count(*) as totalQuestion from exam_admin.question_master`);
    data[2] = que[0].totalQuestion;
    
    var user = await queryExecutor(`SELECT count(*) as students FROM exam_admin.student_master;`);
    data[3] = user[0].students;



    var category=await queryExecutor(`SELECT * FROM exam_admin.question_category;`);

    data[4]=category;

    let questionsRatio=[];
    for(let i=0;i<data[4].length;i++){
    
        const id=data[4][i].category_id;

        var que = await queryExecutor(`SELECT count(*) as questions FROM exam_admin.question_master where question_master.category_id=${id}`);
        
        const questionCount=que[0].questions;
        questionsRatio[i]=`width:${Math.floor((questionCount/data[4].length)*10)}%`;
    }
   
    const exam_attempt=await queryExecutor(`SELECT * FROM exam_admin.exam_attempt_master`);
     var s_id = req.body.student_id;
    
    var student_name = await queryExecutor(`select student_master.fname from student_master inner join  exam_attempt_master on exam_attempt_master.student_id=student_master.student_id `);
    res.render('dashboard.ejs', { data: data,questionsRatio:questionsRatio,exam_attempt:exam_attempt,student_name});
})
app.listen(5001, function () {
    console.log('Server is running on port 5001');
})

