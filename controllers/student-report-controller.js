const queryExecurter = require('../database/dbHelper.js');
class StudentReport{
    static displayStudentReport =async(req,res)=>{
        const{examId,stdId}=req.query;
        const result=await queryExecurter(`SELECT student_master.fname,exam_master.exam_name,student_master.student_id,result_master.exam_id,result_master.student_id,result_master.total_mark,
        result_master.obtain_mark,result_master.question_ids,result_master.question_answers from student_master inner join result_master 
        on student_master.student_id=result_master.student_id inner join exam_master on result_master.exam_id=exam_master.exam_id where student_master.student_id=${stdId};`);
        
    }
}

module.exports=StudentReport;