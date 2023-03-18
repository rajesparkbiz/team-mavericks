const con = require("../src/config");
const queryExecuter=require('../database/dbHelper')
class createExams {
  static createExam = async (req, res) => {};

  // function for showinf caategoires from the database
  static showCategory = async (req, res) => {
  
    const ans=await queryExecuter("SELECT category_name from question_category");
    res.render("question-category", { category_list :ans});


    // con.query(
    //   "SELECT category_name from question_category",
    //   (err, category_list) => {
    //     if (err) throw err;
    //     res.render("question-category", { category_list });
    //   }
    // );
  };
}

module.exports = createExams;
