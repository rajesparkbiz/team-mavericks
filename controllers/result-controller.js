const queryExecurter = require("../database/dbHelper.js");
const con = require("../src/config.js");

class ResultController {
  static displayExams = async (req, res) => {
    var limit = 3;
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
        
        if(err) throw err;

        con.query(
          `SELECT count(*) as count FROM exam_attempt_master;`,
          (err, exam_data) => {

            if(err) throw err;
            //  console.log("result data",data.length);
            for (var i = 0; i < data.length; i++) {
              var total = data[i].exam_total_question;
              var obtained = data[i].exam_result;
              var marks = parseInt((total * 33) / 100);
              var count = Math.floor(exam_data[0].count / limit);
              // console.log("result count",count);

              if (obtained >= marks) {
                status.push("pass");
              } else {
                status.push("fail");
              }
            }

            result_data = data;
            //console.log("result data",result_data);
            if (!ajax) {
              res.render("result.ejs", { data: data, status, count });
            } else {
              // console.log(result_data);
              res.json(result_data);
            }
          }
        );
      }
    );
  };

  static displayStudentResult = async (req, res) => {
    var status = [];
    var exam_id = req.query.exam_id;
    var data =
      await queryExecurter(`select exam_attempt_master.exam_id as id,fname,exam_total_question,exam_result  
        from exam_attempt_master inner join exam_master as exam on exam.exam_id = exam_attempt_master.exam_id
         inner join student_master as s on s.student_id=
        exam_attempt_master.student_id where exam_attempt_master.exam_id = '${exam_id}'`);
    for (var i = 0; i < data.length; i++) {
      var total = data[i].exam_total_question;
      var obtained = data[i].exam_result;
      var marks = parseInt((total * 33) / 100);
      if (obtained >= marks) {
        status.push("pass");
      } else {
        status.push("fail");
      }
    }
    res.render("studentresult", { data: data, status });
  };
}
module.exports = ResultController;
