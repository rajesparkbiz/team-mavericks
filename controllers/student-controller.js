const queryExecurter = require('../database/dbHelper.js');

class StudentController {

    static displayStudentData = async (req, res) => {
        var student_master = await queryExecurter(`SELECT * FROM student_master`);
        res.render('user.ejs', { data: student_master });
    }

    static filterExams = async (req, res) => {

        const { flag, search } = req.query;
        let exam;
        exam = await queryExecurter(`select * from exam_master where ${flag} like '%${search}%'`);
        if (!exam) {
            exam = await queryExecurter(`select * from exam_admin.exam_master where exam_master.${flag} = '%${search}%'`);
        }
        if (search.length == "") {
            exam = await queryExecurter(`select * from exam_admin.exam_master;`);
        }

        res.json({ exam });
    }
}

module.exports = StudentController;