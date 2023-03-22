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

    static displayStudentResult =async(req,res)=>{
        var status = [];
        var exam_id = req.query.exam_id;
        var data = await queryExecurter(`select exam_attempt_master.exam_id as id,fname,exam_total_question,exam_result  
        from exam_attempt_master inner join exam_master as exam on exam.exam_id = exam_attempt_master.exam_id
         inner join student_master as s on s.student_id=
        exam_attempt_master.student_id where exam_attempt_master.exam_id = '${exam_id}'`);
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
      res.render('studentresult', { data: data,status});
        console.log(exam_id)
    }


}

module.exports = ResultController;