const queryExecurter = require('../database/dbHelper.js');
const QueryHelper = require('../services/databaseQuery');

class StudentController {

    static displayStudentData = async (req, res) => {
        // var student_master = await queryExecurter(`SELECT * FROM student_master`);
        var student_master = await QueryHelper.selectQuery('student_master','*',true,false);
        res.render('user.ejs', { data: student_master });
    }

    static filterExams = async (req, res) => {

        const { flag, search } = req.query;
        let exam;
        // exam = await queryExecurter(`select * from exam_master where ${flag} like '%${search}%'`);
        exam = await QueryHelper.selectQuery('exam_master','*',true,true,flag,`%${search}%`,'LIKE');
        if (!exam) {
            // exam = await queryExecurter(`select * from exam_admin.exam_master where exam_master.${flag} = '%${search}%'`);
            exam = await QueryHelper.selectQuery('exam_master','*',true,true,flag,`%${search}%`,'LIKE');
        }
        if (search.length == "") {
            // exam = await queryExecurter(`select * from exam_admin.exam_master;`);
            exam = await QueryHelper.selectQuery('exam_master','*',true,false);
        }

        res.json({ exam });
    }

    static filterStudent = async (req, res) => {
        const {search} = req.query;

        let searchStudent;

        // searchStudent = await queryExecurter(`select * from student_master where ${flag} like '%${search}%'`);

        // if (!searchStudent) {
        //     searchStudent = await queryExecurter(`SELECT * FROM exam_admin.student_master where student_master.${flag}='${search}'`);
        // }
        // if(search.length=="") {
        //     searchStudent = await queryExecurter(`SELECT * FROM exam_admin.student_master;`);
        // }
        // searchStudent = await queryExecurter(`select * from student_master where fname like '%${search}%' OR lname like '%${search}%' OR email like '%${search}%' OR mobile like '%${search}%' OR enrollment like '%${search}%' OR qualification like '%${search}%' OR city like '%${search}%' OR college like '%${search}%'`);
        searchStudent = await QueryHelper.selectQuery('student_master','*',true,true,['fname','lname','email','mobile','enrollment','qualification','city','college'],[`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`],'LIKE','OR');
        res.json({ searchStudent });
    }
}

module.exports = StudentController;