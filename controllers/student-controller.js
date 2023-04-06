const queryExecurter = require('../database/dbHelper.js');
const con = require('../database/dbconnect.js');
const QueryHelper = require('../services/databaseQuery');


class StudentController {


    //REQUIRED TO CHANGE QUERY
    static displayStudentData = async (req, res) => {


        var limit = 10;
        var page = req.query.page || 1;
        var column_name = req.query.column_name || 'student_id';
        var order = req.query.order || 'ASC';
        var offset = (page - 1) * limit;
        var ajax = req.query.AJAX || false;
        var prev, nextpage;

        const countResult = await QueryHelper.selectQuery('student_master', 'count(*) as count', true, false);
        const count = Math.ceil((countResult[0].count) / limit);
        ;

        if (page == 1) {
            prev = 0;
        }
        else {
            prev = parseInt(page) - 1;
        }
        if ((page - 1) == count || page == 0) {
            page = 1;
        } else {
            nextpage = parseInt(page) + 1;
        }
        if (nextpage > count) {
            nextpage = 1
        }


        var student_data;


        student_data = await queryExecurter(`SELECT * FROM student_master ORDER BY ${column_name} ${order} LIMIT ${offset}, ${limit};`)

        if (!ajax) {
            res.render('user.ejs', { data: student_data, order, count, column_name ,page,nextpage});
        }
        else {
            res.json(student_data,page,nextpage);
        }


    }

    static filterExams = async (req, res) => {

        const { flag, search } = req.query;
        let exam;
        exam = await QueryHelper.selectQuery('exam_master', '*', true, true, flag, `%${search}%`, 'LIKE');
        if (!exam) {
            exam = await QueryHelper.selectQuery('exam_master', '*', true, true, flag, `%${search}%`, 'LIKE');
        }
        if (search.length == "") {
            exam = await QueryHelper.selectQuery('exam_master', '*', true, false);

        }

        res.json({ exam });
    }

    static filterStudent = async (req, res) => {
        const { search } = req.query;

        let searchStudent;

        searchStudent = await QueryHelper.selectQuery('student_master', '*', true, true, ['fname', 'lname', 'email', 'mobile', 'enrollment', 'qualification', 'city', 'college'], [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], 'LIKE', 'OR');
        res.json({ searchStudent });
    }
}

module.exports = StudentController;