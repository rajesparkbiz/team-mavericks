const { authPlugins } = require('mysql2');
const queryExecurter = require('../database/dbHelper.js');
class ExamController {

    static toogleSwitch = async (req, res) => {

        const currentStatus = await queryExecurter(`SELECT exam_master.exam_isActive as status FROM exam_admin.exam_master where exam_master.exam_id=${req.query.id}`);
        const isActive = currentStatus[0].status;

        var query = `update exam_admin.exam_master set exam_isActive = '${isActive == 'yes' ? 'no' : 'yes'}' where exam_id=${req.query.id}`;

        const toggleSwitchQuery = await queryExecurter(query);

        res.redirect('/dashboard/exams');
    }

    static createExam = async (req, res) => {
        res.render('create-exam');
    }

    static addExam = async (req, res) => {

        let { examname, examcode, totalque, duration } = req.body;

        let query = `INSERT INTO exam_master (exam_name, exam_access_code, exam_total_question, exam_isActive) VALUES ('${examname}', '${examcode}', '${totalque}', '${duration}');`;
        const addExam = await queryExecurter(query);

        const defaultCategory = await queryExecurter(`SELECT question_category.category_id as id FROM question_category order by question_category.category_id ASC limit 1`);

        const categoryId = defaultCategory[0].id;

        const questions = await queryExecurter(`SELECT * FROM question_master where question_master.category_id=${categoryId}`);

        var allQuestionIds = [];
        for (let i = 0; i < questions.length; i++) {
            allQuestionIds[i] = questions[i].question_id;
        }

        const question_category = await queryExecurter(`SELECT question_category.category_name,question_category.category_id FROM exam_admin.question_category;`);

        const defaultQuestion = await queryExecurter(`SELECT exam_category.question_id FROM exam_category where exam_category.exam_id=${addExam.insertId} and exam_category.category_id=${categoryId}`);

        var defaultQuestionIds = [];


        defaultQuestion.forEach(element => {
            defaultQuestionIds[j] = element.question_id;
        });

        let result = [];
        for (let i = 0; i < allQuestionIds.length; i++) {
            const id = defaultQuestionIds.find(item => item === allQuestionIds[i] && item.size === allQuestionIds.size);
            result.push(id);
        }
        console.log(result);


        console.log(allQuestionIds);
        console.log(defaultQuestionIds);

        res.render('select-question', { questions: questions, categories: question_category, categoryId: categoryId, examId: addExam.insertId,});
    }

    static getProductStock = (productList, shoppingCart) => {
        const result = [];
        for (let i = 0; i < shoppingCart.length; i++) {
            const product = productList.find(item => item.color_code === shoppingCart[i].color && item.size === shoppingCart[i].size);
            result.push(product);
        }
        return result;
    }

    static checkname = async (req, res) => {
        let examname = req.query.examname;
        let query = `SELECT exam_name FROM exam_master WHERE exam_name = '${examname}';`;
        const examnamechk = await queryExecurter(query);
        res.json({ "no_of_exam": examnamechk.length });
    }
    
    static choosedQuestions = async (req, res) => {

        const examId = req.query.exam_id;
        var choosedCategory = [];

        const examResult = await queryExecurter(`select exam_category.category_id from exam_category where exam_category.exam_id=${examId}`);

        if (examResult.length != 0) {

            for (let i = 0; i < examResult.length; i++) {
                var categoryMap = [];
                const categoryName = await queryExecurter(`SELECT question_category.category_name,question_category.category_id FROM question_category where question_category.category_id=${examResult[i].category_id}`);

                choosedCategory[i] = {
                    "category": categoryName[0].category_name,
                    "category_id": categoryName[0].category_id
                }
            }


            //for default first category questions
            const categoryId = choosedCategory[0].category_id;

            var categoryQuestions = [];

            const questionsResult = await queryExecurter(`select exam_category.question_id from exam_category where exam_category.exam_id=${examId} and exam_category.category_id=${categoryId}`);

            const questionsId = questionsResult[0].question_id.split(",");



            for (let i = 0; i < questionsId.length; i++) {
                const query = `SELECT question_master.question FROM question_master where question_master.question_id=${questionsId[i]}`;


                const question = await queryExecurter(query);
                categoryQuestions[i] = question[0].question;
            }

            res.render('choosed-question', { categories: choosedCategory, exam_id: examId, categoryQuestions: categoryQuestions, questionCount: questionsId.length, status: true });
        } else {
            res.render('choosed-question', { status: false });
        }

    }

    static displaychoosedQuestion = async (req, res) => {
        const examId = req.query.examId;
        const categoryId = req.query.categoryId;

        var categoryQuestions = [];

        const questionsResult = await queryExecurter(`select exam_category.question_id from exam_category where exam_category.exam_id=${examId} and exam_category.category_id=${categoryId}`);

        const questionsId = questionsResult[0].question_id.split(",");

        for (let i = 0; i < questionsId.length; i++) {
            const query = `SELECT question_master.question,question_master.question_id FROM question_master where question_master.question_id=${questionsId[i]}`;


            const question = await queryExecurter(query);
            categoryQuestions[i] = question[0];
        }
        res.json({ categoryQuestions, questionCount: questionsId.length });
    }

    static selectQuestions = async (req, res) => {
        const question_category = await queryExecurter(`SELECT question_category.category_name,question_category.category_id FROM question_category;`);

        res.render('select-question', { categories: question_category });
    }

    static insertSelectQuestions = async (req, res) => {
        const { examid, categoryid, questions } = req.query;
        const question = questions.split(",");
        const questionCount = question.length;

        const insertQuery = `INSERT INTO exam_category (exam_id, category_count, question_id, category_id) VALUES ('${examid}', '${questionCount}', '${questions}', '${categoryid}');
        `;

        const result = await queryExecurter(insertQuery);

        res.json();

    }


}

module.exports = ExamController;