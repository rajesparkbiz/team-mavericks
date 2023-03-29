const queryExecurter = require('../database/dbHelper.js');

class ResultController {

    static displayExams = async (req, res) => {
        var status = [];
        var data = await queryExecurter(`select fname, exam_name,exam_total_question,exam_result 
        from exam_attempt_master  exam inner join exam_master e on exam.exam_id = e.exam_id inner join
         student_master s on s.student_id = exam.student_id;`);
        for (var i = 0; i < data.length; i++) {
            var total = data[i].exam_total_question;
            var obtained = data[i].exam_result;
            var marks = parseInt((total * 33) / 100);
            if (obtained >= marks) {
                status.push('pass');
            }
            else {
                status.push('fail');
            }
        }
        res.render('result.ejs', { data: data, status });
    }

    static displayStudentResult = async (req, res) => {
        
        const examId = req.query.exam_id;
        const result = await queryExecurter(`select result_master.obtain_mark,result_master.total_mark,exam_master.exam_name,student_master.fname,student_master.student_id from result_master inner join exam_master on
        result_master.exam_id=exam_master.exam_id inner join student_master on result_master.student_id=student_master.student_id where 
        result_master.exam_id=${examId}`);

        res.render('studentresult', { data: result });
    }

    static displayStudentExamsReport = async (req, res) => {
        const studentId = req.query.studentId;
        const result = await queryExecurter(`SELECT student_master.fname,exam_master.exam_name,student_master.student_id,result_master.exam_id,result_master.student_id,result_master.total_mark,
        result_master.obtain_mark,result_master.question_ids,result_master.question_answers from student_master inner join result_master 
        on student_master.student_id=result_master.student_id inner join exam_master on result_master.exam_id=exam_master.exam_id where student_master.student_id=${studentId};
        `);

        const question_ids=result[0].question_ids;
        const question_answer=result[0].question_answers;
        const answer=question_answer.split(",");
        const ids=question_ids.split(",");
        var question=[];
        
        for(let i=0;i<ids.length;i++){
            const currectAnswer=await queryExecurter(`SELECT question_master.question,question_master.question_answer FROM question_master where question_master.question_id=${ids[i]}`);
            var status;
            if(currectAnswer[0].question_answer==answer[i].replaceAll('"','')){
                status='true';
            }else{
                status='false';
            }

            question.push({
                "question":currectAnswer[0].question,
                "answer":currectAnswer[0].question_answer,
                "s_answer":answer[i].replaceAll('"',''),
                "status":status
            });
        }

        res.render('view-report', { data: question,result:result[0]});

    }
}
module.exports = ResultController;