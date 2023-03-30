const queryExecurter = require("../database/dbHelper.js");
const con = require("../database/dbconnect.js");

class ResultController {

  static displayExams = async (req, res) => {
    var limit = 1;
    var page = req.query.page || 1;
    var offset = (page - 1) * limit;
    var ajax = req.query.AJAX || false;
    var result_data = [];
    
    var status = [];
    con.query(
      `select fname, exam_name,exam_total_question,exam_result ,id
        from exam_attempt_master  exam inner join exam_master e on exam.exam_id = e.exam_id inner join
         student_master s on s.student_id = exam.student_id LIMIT ${offset},${limit};`,
      (err, data) => {

        if (err) throw err;

        con.query(
          `SELECT count(*) as count FROM exam_master;`,
          (err, exam_data) => {

            if (err) throw err;
            for (var i = 0; i < data.length; i++) {
              var total = data[i].exam_total_question;
              var obtained = data[i].exam_result;
              var marks = parseInt((total * 33) / 100);
              var count = Math.floor(exam_data[0].count / limit);

              if (obtained >= marks) {
                status.push("pass");
              } else {
                status.push("fail");
              }
            }

            result_data = data;
            if (!ajax) {
              res.render("result.ejs", { data: data, status, count });
            } else {
              res.json(result_data);
            }
          }
        );
      }
    );
  };

  static displayStudentResult = async (req, res) => {

    const examId = req.query.examId;
    var limit = 5;
    var page = req.query.page || 1;
    var column_name = req.query.column_name || 'student_id';
    var order = req.query.order || 'ASC';
    var offset = (page - 1) * limit;
    var ajax = req.query.AJAX || false;

    var student_data;


    const student_master = await queryExecurter(`select result_master.obtain_mark,result_master.total_mark,exam_master.exam_name,student_master.fname,student_master.student_id from result_master inner join exam_master on
        result_master.exam_id=exam_master.exam_id inner join student_master on result_master.student_id=student_master.student_id where 
        result_master.exam_id=${examId} LIMIT ${offset}, ${limit};`)

    const result = await queryExecurter(`select count(*) as count from result_master where result_master.exam_id=${examId}`);

    var count = Math.ceil(result[0].count / limit);


    student_data = student_master;

    if (!ajax) {
      res.render('studentresult', { data: student_master, order, count, column_name, examId: examId });
    }
    else {
      res.json(student_data);
    }
  };

  static displayStudentExamsReport = async (req, res) => {
    const studentId = req.query.studentId;
    const result = await queryExecurter(`SELECT student_master.fname,exam_master.exam_name,student_master.student_id,result_master.exam_id,result_master.student_id,result_master.total_mark,
    result_master.obtain_mark,result_master.question_ids,result_master.question_answers from student_master inner join result_master 
    on student_master.student_id=result_master.student_id inner join exam_master on result_master.exam_id=exam_master.exam_id where student_master.student_id=${studentId};
    `);

    const question_ids = result[0].question_ids;
    const question_answer = result[0].question_answers;
    const answer = question_answer.split(",");
    const ids = question_ids.split(",");
    var question = [];

    for (let i = 0; i < ids.length; i++) {
      const currectAnswer = await queryExecurter(`SELECT question_master.question,question_master.question_answer FROM question_master where question_master.question_id=${ids[i]}`);
      var status;
      if (currectAnswer[0].question_answer == answer[i].replaceAll('"', '')) {
        status = 'true';
      } else {
        status = 'false';
      }

      question.push({
        "question": currectAnswer[0].question,
        "answer": currectAnswer[0].question_answer,
        "s_answer": answer[i].replaceAll('"', ''),
        "status": status
      });
    }

    res.render('view-report', { data: question, result: result[0] });

  }
}
module.exports = ResultController;
