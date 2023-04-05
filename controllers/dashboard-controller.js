const queryExecurter = require('../database/dbHelper.js');
const QueryHelper = require('../services/databaseQuery');

const con = require("../database/dbconnect.js")
class StdentQuestion {


    static dashboardPage = async (req, res) => {
        var data = [];

        var categories = await QueryHelper.selectQuery('question_category','count(*) as totalCategories',true,false);
        data[0] = categories[0].totalCategories;

        var exam = await QueryHelper.selectQuery('exam_master','count(*) as exams',true,false);
        data[1] = exam[0].exams;

        var que = await QueryHelper.selectQuery('question_master','count(*) as totalQuestion',true,false);
        data[2] = que[0].totalQuestion;

        var user = await QueryHelper.selectQuery('student_master','count(*) as students',true,false);
        data[3] = user[0].students;



        var category = await QueryHelper.selectQuery('question_category','*',true,false);

        data[4] = category;

        let questionsRatio = [];

        for (let i = 0; i < data[4].length; i++) {

            const id = data[4][i].category_id;

            var que = await QueryHelper.selectQuery('question_master','count(*) as questions',true,true,'category_id',`${id}`,'=');

            const questionCount = que[0].questions;
            questionsRatio[i] = `width:${Math.floor((questionCount / data[4].length) * 10)}%`;
        }




        const exam_action=await QueryHelper.selectQuery('exam_master',['exam_name','exam_isActive','action_time'],true,false);

        var exam_data = [];
        for (let i = 0; i < exam_action.length; i++) {
            const date = new Date(exam_action[i].action_time);
            var status;

            if (exam_action[i].exam_isActive == 'yes') {
                status = 'Active'
            }
            if (exam_action[i].exam_isActive == 'no') {
                status = 'InActive'
            }

            exam_data[i] = {
                "exam_name": exam_action[i].exam_name,
                "exam_isActive": status,
                "action_time": date.toLocaleString()
            }
        }


        res.render('dashboard', { data: data, questionsRatio: questionsRatio, exam_action: exam_data });
    }


    static displayExams = async (req, res) => {


        // if (page == 1) {
        //     prev = 0;
        // }
        // else {
        //     prev = parseInt(page) - 1;
        // }
        // if (page == parseInt(total_records / limit) || page == 0) {
        //     page = 1;
        // } else {
        //     page++;
        // }

        var limit = 5;
        var page = req.query.page || 1;
        var nextpage=parseInt(page)+1;
        var offset = (page - 1) * limit;
        var ajax = req.query.AJAX || false;



        const exam_data = await queryExecurter(`SELECT * FROM exam_master where exam_master.isDeleted='0' LIMIT ${offset},${limit};`);
        var status=[];
        for(let i=0;i<exam_data.length;i++){
           
            const questionCount=await QueryHelper.selectQuery('exam_category','count(*) as count',true,true
            ,'exam_id',`${exam_data[i].exam_id}`,'=');
            if(parseInt(questionCount[0].count)>0){
                status[i]=true;
            }else{
                status[i]=false;
            }
        }


        const result=await QueryHelper.selectQuery('exam_master','count(*) as count',true,true,'isDeleted','0','=');

        var count = Math.ceil((result[0].count) / limit);
        
        if (!ajax) {
            res.render('exam.ejs', { data: exam_data, count,status:status,page,nextpage});
        } else {
            res.json({exam_data,status,page,count,nextpage});
        }



    }

}


module.exports = StdentQuestion;