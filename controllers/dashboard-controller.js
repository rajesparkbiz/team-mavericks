const queryExecurter = require('../database/dbHelper.js');
const QueryHelper = require('../services/databaseQuery');
class StdentQuestion {

    
    static dashboardPage = async(req,res)=>{
        var data = [];

        // var categories = await queryExecurter(`select count(*) as totalCategories from exam_admin.question_category`);
        var categories = await QueryHelper.selectQuery('question_category','count(*) as totalCategories',true,false);
        data[0] = categories[0].totalCategories;
    
        // var exam = await queryExecurter(`select count(*) as exams from exam_admin.exam_master`);
        var exam = await QueryHelper.selectQuery('exam_master','count(*) as exams',true,false);
        data[1] = exam[0].exams;
    
        // var que = await queryExecurter(`select count(*) as totalQuestion from exam_admin.question_master`);
        var que = await QueryHelper.selectQuery('question_master','count(*) as totalQuestion',true,false);
        data[2] = que[0].totalQuestion;
    
        // var user = await queryExecurter(`SELECT count(*) as students FROM exam_admin.student_master;`);
        var user = await QueryHelper.selectQuery('student_master','count(*) as students',true,false);
        data[3] = user[0].students;
    
    
    
        // var category = await queryExecurter(`SELECT * FROM exam_admin.question_category;`);
        var category = await QueryHelper.selectQuery('question_category','*',true,false);
    
        data[4] = category;
    
        let questionsRatio = [];

        for (let i = 0; i < data[4].length; i++) {
    
            const id = data[4][i].category_id;
    
            // var que = await queryExecurter(`SELECT count(*) as questions FROM exam_admin.question_master where question_master.category_id=${id}`);
            var que = await QueryHelper.selectQuery('question_master','count(*) as questions',true,true,'category_id',`${id}`,'=');
    
            const questionCount = que[0].questions;
            questionsRatio[i] = `width:${Math.floor((questionCount / data[4].length) * 10)}%`;
        }
    
        // const exam_attempt = await queryExecurter(`SELECT * FROM exam_admin.exam_attempt_master`);
        const exam_attempt = await QueryHelper.selectQuery('exam_attempt_master','*',true,false);
        var s_id = req.body.student_id;
    
        var student_name = await queryExecurter(`select student_master.fname from student_master inner join  exam_attempt_master on exam_attempt_master.student_id=student_master.student_id `);

        res.render('dashboard', { data: data, questionsRatio: questionsRatio, exam_attempt: exam_attempt, student_name});
    }

    static displayExams=async(req,res)=>{
        // var exam_master = await queryExecurter(`SELECT * FROM exam_master`);
        var exam_master = await QueryHelper.selectQuery('exam_master','*',true,false);
        var questionStatus=[];
        for(let i=0;i<exam_master.length;i++){
            // const isAddedQuestions=await queryExecurter(`SELECT count(*) as status FROM exam_admin.exam_category where exam_category.exam_id=${exam_master[i].exam_id}`);
            const isAddedQuestions=await QueryHelper.selectQuery('exam_category','count(*) as status',true,true,'exam_id',`${exam_master[i].exam_id}`,'=');
            questionStatus[i]=isAddedQuestions[0].status;
        }

        res.render('exam.ejs', { data: exam_master,questionStatus:questionStatus });
    }
    
}


module.exports = StdentQuestion;