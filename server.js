const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql2 = require('mysql2');
const { ejs } = require('ejs');
var http = require('http');
const { connect } = require('http2');

app.use(express.static(__dirname+"/public"));

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
var data=[];
app.get('/dashboard', async(req,res)=>{
    var categories = await queryExecutor(`select count(category_id) as totalcategories from question_category`);
    data[0]=categories[0].totalcategories;
    // console.log(categories);
    var exam = await queryExecutor(`select count(exam_id) as total from exam_master`);
//    console.log(exam);
   data[1] = exam[0].total;
   var que = await queryExecutor(`select count(question_id) as totalque from question_master`);
   data[2] = que[0].totalque;
//    console.log(que);
   var user = await queryExecutor(`select count(user_id) as totaluser from user_master`);
   data[3] = user[0].totaluser;
//    console.log(user);
    res.render('dashboard.ejs',{data: data});
})
app.listen(5001, function(){
    console.log('Server is running on port 5000');
})

