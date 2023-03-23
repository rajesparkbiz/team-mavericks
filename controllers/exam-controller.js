const queryExecurter = require('../database/dbHelper.js');
class ExamController {
    static toogleSwitch = async (req, res) => {
        const currentStatus = await queryExecurter(`SELECT exam_master.exam_isActive as status FROM exam_admin.exam_master where exam_master.exam_id=${req.query.id}`);
        const isActive = currentStatus[0].status;

        var query= `update exam_admin.exam_master set exam_isActive = '${isActive=='yes' ? 'no':'yes'}' where exam_id=${req.query.id}`;
        
        const toggleSwitchQuery = await queryExecurter(query);

        res.redirect('/dashboard/exams');
    }

    static createExam = async (req, res) => {
        res.render('create-exam');
    }
    static addExam = async (req,res) =>{
        let {examname,examcode,totalque,duration}=req.body;
        let query= `INSERT INTO exam_master (exam_name, exam_access_code, exam_total_question, exam_isActive) VALUES ('${examname}', '${examcode}', '${totalque}', '${duration}');`;
        const addExam = await queryExecurter(query);
        res.redirect('/dashboard/exams');
    }
    static checkname = async (req,res) =>{
        let examname=req.query.examname;
        let query= `SELECT exam_name FROM exam_master WHERE exam_name = '${examname}';`;
        const examnamechk = await queryExecurter(query);
        res.json({"no_of_exam":examnamechk.length});
    }
}

module.exports = ExamController;