const queryExecurter = require('../database/dbHelper.js');
const {format,utcToZonedTime,} = require("date-fns-tz");

class StudentController {

    static displayStudentData = async (req, res) => {
        var date= [];
       
var student_master = await queryExecurter(`SELECT * FROM student_master`);
for(var i=0; i<student_master.length;i++){
var date_1 = student_master[i].createdate;
          const timeZone = 'Asia/Kolkata';
 const time = utcToZonedTime(date_1, timeZone);
            var formatedate = format(time, 'yyyy-MM-dd HH:mm:ss')
            date.push(formatedate);

           
        }

        res.render('user.ejs', { data: student_master,date });
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

    static filterStudent =async(req,res)=>{
        const {flag, search}=req.query;
    
        let searchStudent;
    
        searchStudent = await queryExecurter(`select * from student_master where ${flag} like '%${search}%'`);
        
        if (!searchStudent) {
            searchStudent = await queryExecurter(`SELECT * FROM exam_admin.student_master where student_master.${flag}='${search}'`);
        }
        if(search.length=="") {
            searchStudent = await queryExecurter(`SELECT * FROM exam_admin.student_master;`);
        }
        res.json({ searchStudent });
    }
    static datetime = async(req,res)=>{
        const utcDate = '2022-01-15T11:02:17Z';
    }
}

module.exports = StudentController;