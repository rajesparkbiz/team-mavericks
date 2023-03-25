const queryExecurter = require('../database/dbHelper.js');
const session = require('express-session');
var last_id;
class ExamController {

    

    static toogleSwitch = async (req, res) => {
        const currentStatus = await queryExecurter(`SELECT exam_master.exam_isActive as status FROM exam_admin.exam_master where exam_master.exam_id=${req.query.id}`);
        const isActive = currentStatus[0].status;

        var query= `update exam_admin.exam_master set exam_isActive = '${isActive=='yes' ? 'no':'yes'}' where exam_id=${req.query.id}`;
        
        const toggleSwitchQuery = await queryExecurter(query);

        res.redirect('/dashboard/exams');
    }

    static showExamForm = async (req, res) => {
        res.render('create-exam' );
    }

    static createExam = async(req,res) => {

        var examname = req.body.examname;
        var examcode = req.body.examcode
        var totalque = req.body.totalque
        var duration = req.body.duration;
        
        

        // query to insert in exam master
        console.log(examname,examcode,totalque,duration);
        var insertExam = await queryExecurter(`INSERT INTO exam_master(exam_name,exam_access_code,exam_total_question,exam_duration) VALUES('${examname}','${examcode}','${totalque}','${duration}')`);
        
        
        last_id = insertExam.insertId;
         
         
         // query to display total questions
        var questionCounter  = await queryExecurter(`SELECT exam_total_question FROM exam_master WHERE exam_id= ${last_id}`);


        //query to display all categories
        var allCategories = await queryExecurter('SELECT * FROM question_category');

        //console.log("your all categories",allCategories);
         res.render('choose-question',{allCategories,questionCounter});
    }

    static showCategoryQuestion = async(req,res) =>{
        var id = req.query.questionCategoryId ;
       // console.log('your category id:',id);

        const specificCategoryQuestion = await queryExecurter(`SELECT * FROM question_master WHERE category_id = ${id};`);
        //console.log('harshil',specificCategoryQuestion);
        res.json(specificCategoryQuestion);
    
    }

    static CreateQuestionPaper = async(req,res) =>{

        var createdQuestions = req.body;
        console.log(createdQuestions);
        var count ;
        

        var  count=0;
      

        console.log(last_id);

        var category_id ;
        for(var i=0;i<createdQuestions.length;i++){
            var question =[];
            for(var j=0;j<createdQuestions[i].length;j++){
                console.log(createdQuestions[i][j][1]);
                category_id=createdQuestions[i][j][0];
                question.push(createdQuestions[i][j][1])

            }
          
        }

        var sql =`insert into exam_category(exam_id,category_count,question_id,category_id) values('${last_id}','${question.length}','${question}','${category_id}');`
console.log(sql);
        var insertQuestions = await queryExecurter(sql);
        console.log(question);
        question =[];
console.log("empty",question);
        console.log(count);
        //console.log("Your created questions",createdQuestions);

    }


}

module.exports = ExamController;