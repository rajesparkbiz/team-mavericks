const queryExecurter = require('../database/dbHelper.js');
const con = require('../database/dbconnect.js');
const QueryHelper = require('../services/databaseQuery');


class StudentController {


    //REQUIRED TO CHANGE QUERY
    static displayStudentData = async (req, res) => {

        
        var limit = 5;
        var page = req.query.page || 1;
        var column_name = req.query.column_name || 'student_id';
        var order = req.query.order || 'ASC';
        var offset = (page - 1) * limit;
        var ajax = req.query.AJAX || false;

        var student_data;

        con.query(`SELECT * FROM student_master ORDER BY ${column_name} ${order} LIMIT ${offset}, ${limit};`,(err,student_master)=>{

            con.query('SELECT count(*) as count from student_master;',(err,result)=>{
                if(err) throw err;
                var count = Math.ceil(result[0].count/limit);

                student_data = student_master;
                if(!ajax)
                {
                    res.render('user.ejs', { data: student_master, order, count ,column_name });
                }
                else{
                    res.json(student_data);
                }
                
            })

        });
        
        
    }

    static filterExams = async (req, res) => {

        const { flag, search } = req.query;
        let exam;
        exam = await QueryHelper.selectQuery('exam_master','*',true,true,flag,`%${search}%`,'LIKE');
        if (!exam) {
            exam = await QueryHelper.selectQuery('exam_master','*',true,true,flag,`%${search}%`,'LIKE');        }
        if (search.length == "") {
            exam = await QueryHelper.selectQuery('exam_master','*',true,false);

        }

        res.json({ exam });
    }

    static filterStudent = async (req, res) => {
        const {search} = req.query;

        let searchStudent;
        
        searchStudent = await QueryHelper.selectQuery('student_master','*',true,true,['fname','lname','email','mobile','enrollment','qualification','city','college'],[`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`],'LIKE','OR');
        res.json({ searchStudent });
    }
}

module.exports = StudentController;