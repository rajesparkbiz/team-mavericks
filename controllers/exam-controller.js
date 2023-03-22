const queryExecurter = require('../database/dbHelper.js');
class ExamController {
    static toogleSwitch = async (req, res) => {
        const currentStatus = await queryExecurter(`SELECT exam_master.exam_isActive as status FROM exam_admin.exam_master where exam_master.exam_id=${req.query.id}`);
        const isActive = currentStatus[0].status;

        var query;
        if (isActive == 'yes') {
            query = `update exam_admin.exam_master set exam_isActive = 'no' where exam_id=${req.query.id}`;
        } else {
            query = `update exam_admin.exam_master set exam_isActive = 'yes' where exam_id=${req.query.id}`;
        }

        const toggleSwitchQuery = await queryExecurter(query);

        res.redirect('/dashboard/exams');
    }

  
    
static createExam = async (req, res) => {
    res.render('create_exam.ejs' );
}
    
}

module.exports = ExamController;