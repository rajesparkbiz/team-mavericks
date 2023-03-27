const con = require("../src/config");
const util = require("util");
const queryExecuter=require('../database/dbHelper');

class addCategory {
  static addCategory = async (req, res) => {
    var category_name = req.query.category;
    
    
    const categoryQuery=await queryExecuter(`INSERT INTO exam_admin.question_category (category_name) VALUES ('${category_name.toUpperCase()}');
    `);

    const categoryAllQuery=await queryExecuter(`SELECT category_name FROM exam_admin.question_category;`);

    // res.render('category-question.ejs');
    res.json(); 
  };

  static verifyCategory = async (req, res) => {
    
    const verifyCat=await queryExecuter(`SELECT count(*) as status FROM exam_admin.question_category where question_category.category_name='${req.query.category}'`);
    const status=verifyCat[0].status;

    res.json({status:status});
  };

  
   static showCategory = async (req, res) => {
  
    const ans=await queryExecuter(`SELECT * FROM exam_admin.question_category ;`);
    res.render("question-category", { category_list :ans,actionState:'add'});
  };

  static editCategory = async (req,res) =>{
    

    //console.log("your edit category",req.body.editCategory);
     var editCategoryName = req.body.edit_category_name;
    var id = req.body.id;
    console.log("your category id",id,"and your category name",editCategoryName);


    const editCategory =await queryExecuter(`UPDATE question_category SET category_name = '${editCategoryName}' WHERE category_id = ${id};
    `);

     res.redirect('/category/showCategory');
  };

  static deleteCategory = async(req,res) =>{

    var id = req.body.id;
    console.log("your del id",id)
    const deleteCategory =await queryExecuter(`DELETE FROM question_category WHERE category_id = ${id};
    `);

     res.redirect('/category/showCategory');
  }
}

module.exports = addCategory;
