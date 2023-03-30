const queryExecurter = require('../database/dbHelper.js');
const QueryHelper = require('../services/databaseQuery');

class CategoryController {

    static addCategory = async (req, res) => {
        var category_name = req.query.category;
        
      
        const categoryQuery = await QueryHelper.insertQuery('question_category','category_name',`${category_name.toUpperCase()}`,true);
        
       
        res.redirect('/category/showCategory');
    };

    static verifyCategory = async (req, res) => {

        const verifyCat = await QueryHelper.selectQuery('question_category','count(*) as status',true,true,'category_name',`${req.query.category}`,'=');
        const status = verifyCat[0].status;

        res.json({ status: status });
    };


    static showCategory = async (req, res) => {

       
        const ans = await QueryHelper.selectQuery('question_category','*',true,false);

        res.render("category-question", { category_list: ans, actionState: 'add' });
    };  

    static editCategory = async (req, res) => {
        var editCategoryName = req.body.edit_category_name;
        var id = req.body.id;
        
        const editCategory = await QueryHelper.updateQuery('question_category','category_name',editCategoryName.toUpperCase(),'category_id',id,'=',true);
        res.redirect('/category/showCategory');
    };

    static deleteCategory = async (req, res) => {

        var id = req.query.id;
        
        const deleteCategory = await queryExecurter(`DELETE FROM question_category WHERE category_id = ${id};
        `);
        res.redirect('/category/showCategory');
    }
}

module.exports=CategoryController;