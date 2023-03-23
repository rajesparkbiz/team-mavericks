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

        var allCategories = await queryExecurter('SELECT * FROM question_category');

        //console.log("your all categories",allCategories);
         res.render('choose-question',{allCategories});
        
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