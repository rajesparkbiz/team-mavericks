const queryExecurter = require('../database/dbHelper.js');
const con = require("../src/config.js")
class StdentQuestion {

    
    static dashboardPage = async(req,res)=>{
        var data = [];

        var categories = await queryExecurter(`select count(*) as totalCategories from exam_admin.question_category`);
        data[0] = categories[0].totalCategories;
    
        var exam = await queryExecurter(`select count(*) as exams from exam_admin.exam_master`);
        data[1] = exam[0].exams;
    
        var que = await queryExecurter(`select count(*) as totalQuestion from exam_admin.question_master`);
        data[2] = que[0].totalQuestion;
    
        var user = await queryExecurter(`SELECT count(*) as students FROM exam_admin.student_master;`);
        data[3] = user[0].students;
    
    
    
        var category = await queryExecurter(`SELECT * FROM exam_admin.question_category;`);
    
        data[4] = category;
    
        let questionsRatio = [];

        for (let i = 0; i < data[4].length; i++) {
    
            const id = data[4][i].category_id;
    
            var que = await queryExecurter(`SELECT count(*) as questions FROM exam_admin.question_master where question_master.category_id=${id}`);
    
            const questionCount = que[0].questions;
            questionsRatio[i] = `width:${Math.floor((questionCount / data[4].length) * 10)}%`;
        }
    
        const exam_attempt = await queryExecurter(`SELECT * FROM exam_admin.exam_attempt_master`);
        var s_id = req.body.student_id;
    
        var student_name = await queryExecurter(`select student_master.fname from student_master inner join  exam_attempt_master on exam_attempt_master.student_id=student_master.student_id `);


       


        res.render('dashboard', { data: data, questionsRatio: questionsRatio, exam_attempt: exam_attempt, student_name});
    }

    static displayExams=async(req,res)=>{
        // var exam_master = await queryExecurter(`SELECT * FROM exam_master`);
        // var questionStatus=[];
        // for(let i=0;i<exam_master.length;i++){
        //     const isAddedQuestions=await queryExecurter(`SELECT count(*) as status FROM exam_admin.exam_category where exam_category.exam_id=${exam_master[i].exam_id}`);
        //     questionStatus[i]=isAddedQuestions[0].status;
        // }

        // res.render('exam.ejs', { data: exam_master,questionStatus:questionStatus });

        var limit = 10;
        var page = req.query.page || 1;
        var offset = (page - 1) * limit;

         con.query(`SELECT * FROM exam_master LIMIT  ${offset} , ${limit};`,(err,exam_master)=>{
            if(err) throw err;

            con.query('SELECT count(*) as count from exam_master;',(err,result)=>{
                if(err) throw err;
                console.log(result[0].count);
                var count = Math.ceil(result[0].count/limit);
                console.log("dashboardCount",count);
                res.render('exam.ejs', { data: exam_master, count , column_name: "" });
                
                
            })
        })

        
    }
    
}


module.exports = StdentQuestion;