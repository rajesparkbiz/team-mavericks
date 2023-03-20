const con = require("../src/config");
const util = require("util");
const queryExecuter=require('../database/dbHelper');

class addCategory {
  static addCategory = async (req, res) => {
    var category_name = req.query.category;
    
    
    const categoryQuery=await queryExecuter(`INSERT INTO exam_admin.question_category (category_name) VALUES ('${category_name.toUpperCase()}');
    `);

    const categoryAllQuery=await queryExecuter(`SELECT category_name FROM exam_admin.question_category;`);

    res.redirect('/category/showCategory');
  };

  static verifyCategory = async (req, res) => {
    
    const verifyCat=await queryExecuter(`SELECT count(*) as status FROM exam_admin.question_category where question_category.category_name='${req.query.category}'`);
    const status=verifyCat[0].status;

    res.json({status:status});
  };

  
   static showCategory = async (req, res) => {
  
    const ans=await queryExecuter(`SELECT * FROM exam_admin.question_category;`);
    res.render("question-category", { category_list :ans,actionState:'add'});
  };
}

module.exports = addCategory;
