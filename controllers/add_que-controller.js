const querySolver = require('../database/querysolver.js');
let queid = 1;
class Que {
    // INSERT INTO question_master (question_id, category_id, question, question_answer) VALUES ('1', '1', 'hello', 'sdfsdf');
    static addQuePage = async (req, res) => {
        let queCategories = await querySolver(`SELECT category_id,category_name FROM exam_admin.question_category`);
        // SELECT category_id,category_name FROM exam_admin.question_category;
        res.render('add_que', { queCategories });
    }
    static addQue = async (req, res) => {
        let { Question, optionid, option, categories_id } = req.body;
        let queCategories = await querySolver(`INSERT INTO question_master (question_id, category_id, question, question_answer) VALUES ('${queid}', '${categories_id}', '${Question}', '${option[optionid]}');`);
        for (let index = 0; index < option.length; index++) {
            for (let index = 0; index < option.length; index++) {
                if (option[index] != undefined && option[index] != null && option[index].trim() != '') {
                    await querySolver(`INSERT INTO option_master (question_id, option_value) VALUES ('${queid}', '${option[index]}');`);
                }
            }
        }
    }
}
module.exports = Que;