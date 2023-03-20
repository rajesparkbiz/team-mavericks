const queryExecurter = require('../database/dbHelper.js');

class StudentController {

    static displayStudentData = async (req, res) => {
        var student_master = await queryExecurter(`SELECT * FROM student_master`);
        res.render('user.ejs', { data: student_master });
    }

    static filterExams = async (req, res) => {

        const { flag, search } = req.query;

        let searchfname;
        
        searchfname = await queryExecurter(`select * from student_master where ${flag} like '%${search}%'`);

        if (!searchfname) {
            searchfname = await queryExecurter(`SELECT * FROM exam_admin.student_master where student_master.${flag}='${search}'`);
        }
        if (search.length == "") {
            searchfname = await queryExecurter(`SELECT * FROM exam_admin.student_master;`);
        }


        res.json({ searchfname });
    }
}

module.exports = StudentController;