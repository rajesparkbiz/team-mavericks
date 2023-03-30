const queryExecurter = require('../database/dbHelper.js');
const con = require('../database/dbconnect.js');


class StudentController {

    static displayStudentData = async (req, res) => {

        //var query_selector = url.parse(req.url,true);
        //console.log(query_selector);

        
        var limit = 2;
        var page = req.query.page || 1;
        var column_name = req.query.column_name || 'student_id';
        var order = req.query.order || 'ASC';
        var offset = (page - 1) * limit;
        var ajax = req.query.AJAX || false;

        var student_data;

        con.query(`SELECT * FROM student_master ORDER BY ${column_name} ${order} LIMIT ${offset}, ${limit};`,(err,student_master)=>{

            con.query('SELECT count(*) as count from student_master;',(err,result)=>{
                if(err) throw err;
                console.log(result[0].count);
                var count = Math.ceil(result[0].count/limit);
                console.log(count);

                student_data = student_master;
                //console.log(student_master);
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
        exam = await queryExecurter(`select * from exam_master where ${flag} like '%${search}%'`);
        if (!exam) {
            exam = await queryExecurter(`select * from exam_master where exam_master.${flag} = '%${search}%'`);
        }
        if (search.length == "") {
            exam = await queryExecurter(`select * from exam_master;`);
        }
        res.json({ exam });
    }

    static filterStudent = async (req, res) => {
        const { search } = req.query;

        let searchStudent;
        
        searchStudent = await queryExecurter(`select * from student_master where fname like '%${search}%' OR lname like '%${search}%' OR email like '%${search}%' OR mobile like '%${search}%' OR enrollment like '%${search}%' OR qualification like '%${search}%' OR city like '%${search}%' OR college like '%${search}%'`);
        res.json({ searchStudent });
    }
}

module.exports = StudentController;



