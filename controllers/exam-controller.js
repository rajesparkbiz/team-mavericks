const queryExecurter = require('../database/dbHelper.js');
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
         console.log();

         var id = insertExam.insertId;
         
         // query to display total questions
        var questionCounter  = await queryExecurter(`SELECT exam_total_question FROM exam_master WHERE exam_id= ${id}`);

        console.log(questionCounter);


        //query to display all categories
        var allCategories = await queryExecurter('SELECT * FROM question_category');

        //console.log("your all categories",allCategories);
         res.render('choose-question',{allCategories,questionCounter});
    }

    static showCategoryQuestion = async(req,res) =>{
        var id = req.query.questionCategoryId ;
        console.log('your category id:',id);

        const specificCategoryQuestion = await queryExecurter(`SELECT * FROM question_master WHERE category_id = ${id};`);
        console.log('harshil',specificCategoryQuestion);
        res.json(specificCategoryQuestion);
    
    }


}

module.exports = ExamController;