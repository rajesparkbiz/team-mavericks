const queryExecurter = require('../database/dbHelper.js');
const con = require("../database/dbconnect.js")
class StdentQuestion {

    
    static dashboardPage = async(req,res)=>{
        var data = [];

        var categories = await queryExecurter(`select count(*) as totalCategories from question_category`);
        data[0] = categories[0].totalCategories;
    
        var exam = await queryExecurter(`select count(*) as exams from exam_master`);
        data[1] = exam[0].exams;
    
        var que = await queryExecurter(`select count(*) as totalQuestion from question_master`);
        data[2] = que[0].totalQuestion;
    
        var user = await queryExecurter(`SELECT count(*) as students FROM student_master;`);
        data[3] = user[0].students;
    
    
    
        var category = await queryExecurter(`SELECT * FROM question_category;`);
    
        data[4] = category;
    
        let questionsRatio = [];

        for (let i = 0; i < data[4].length; i++) {
    
            const id = data[4][i].category_id;
    
            var que = await queryExecurter(`SELECT count(*) as questions FROM question_master where question_master.category_id=${id}`);
    
            const questionCount = que[0].questions;
            questionsRatio[i] = `width:${Math.floor((questionCount / data[4].length) * 10)}%`;
        }
    


        const exam_action = await queryExecurter(`SELECT exam_master.exam_name,exam_master.exam_isActive,exam_master.action_time FROM test.exam_master;`);

        var exam_data=[];
        for(let i=0;i<exam_action.length;i++){
            const date=new Date(exam_action[i].action_time);
            var status;

            if(exam_action[i].exam_isActive=='yes'){
                status='Active'
            }
            if (exam_action[i].exam_isActive=='no'){
                status='InActive'   
            }

            exam_data[i]={
                "exam_name":exam_action[i].exam_name,
                "exam_isActive":status,
                "action_time":date.toLocaleString()
            }
        }


        res.render('dashboard', { data: data, questionsRatio: questionsRatio,exam_action:exam_data});
    }

    static displayExams=async(req,res)=>{
    
        var limit = 5;
        var page = req.query.page || 1;
        var offset = (page-1) * limit;
        var ajax = req.query.AJAX || false;
        var exam_data  ;
         con.query(`SELECT * FROM exam_master LIMIT ${offset},${limit};`,(err,exam_master)=>{
            if(err) throw err;

            con.query('SELECT count(*) as count from exam_master;',(err,result)=>{
                if(err) throw err;
                var count = Math.ceil((result[0].count)/limit);
                
                exam_data = exam_master 

                if(!ajax)
                {
                    res.render('exam.ejs', { data: exam_master, count , column_name: "" });
                }else{
                    res.json(exam_data);
                }
            
            })
        })

        
    }
    
}


module.exports = StdentQuestion;