const con = require("../src/config");
const util = require("util");
const queryExecuter=require('../database/dbHelper');

class addCategory {
  static addCategory = async (req, res) => {
    var category_name = req.query.category_name;
    
    
    const categoryQuery=await queryExecuter(`INSERT INTO question_category(category_name) values('${category_name.toUpperCase()}');`);

    const categoryAllQuesry=await queryExecuter(`SELECT category_name FROM question_category`);

    res.redirect('/category/showcategory');
  };

  static verifyCategory = async (req, res) => {

    var query = util.promisify(con.query).bind(con);
    var verifyCategory = await query(
      `SELECT category_name FROM question_category;`
    );
    console.log("category names", verifyCategory);
    res.json(verifyCategory.map((name) => name.category_name));
  };

   // function for showinf caategoires from the database
   static showCategory = async (req, res) => {
  
    const ans=await queryExecuter("SELECT category_name from question_category");
    res.render("question-category", { category_list :ans});
  };
}

module.exports = addCategory;
