const queryExecurter = require('../database/dbHelper.js');

class CategoryController {

    static addCategory = async (req, res) => {
        var category_name = req.query.category;
        
        const categoryQuery = await queryExecurter(`INSERT INTO question_category (category_name) VALUES ('${category_name.toUpperCase()}');
        `);
        
        //const categoryAllQuery = await queryExecurter(`SELECT category_name FROM question_category;`);

        res.redirect('/category/showCategory');
    };

    static verifyCategory = async (req, res) => {

        const verifyCat = await queryExecurter(`SELECT count(*) as status FROM question_category where question_category.category_name='${req.query.category}'`);
        const status = verifyCat[0].status;

        res.json({ status: status });
    };


    static showCategory = async (req, res) => {

        const ans = await queryExecurter(`SELECT * FROM question_category ;`);
        res.render("category-question", { category_list: ans, actionState: 'add' });
    };  

    static editCategory = async (req, res) => {
        var editCategoryName = req.body.edit_category_name;
        var id = req.body.id;
        const editCategory = await queryExecurter(`UPDATE question_category SET category_name = '${editCategoryName.toUpperCase()}' WHERE category_id = ${id};
        `);
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