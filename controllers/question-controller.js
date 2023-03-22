const queryExecurter = require('../database/dbHelper.js');
const question_config = require('../public/js/question-config.js');

class QuestionController {

    static deleteQuestion = async (req, res) => {
        const questionId = req.query.id;
        if (questionId) {
            const deleteQuery = await queryExecurter(`UPDATE exam_admin.question_master SET isDeleted = '0' WHERE question_id = '${questionId}';
            `);

        }

    }

    static updateQuestion = async (req, res) => {

        const { questionId, question, questionAnswer, questionOptions, optionsId } = req.body;

        const updateQuery = await queryExecurter(`UPDATE exam_admin.question_master SET question = '${question}', question_answer = '${questionAnswer}' WHERE question_id = '${questionId}'`)

        for (let i = 0; i < questionOptions.length; i++) {
            const updateOptionQuery = await queryExecurter(`UPDATE exam_admin.option_master SET option_value = '${questionOptions[i]}' WHERE option_id = ${optionsId[i]}`);
        }
        res.redirect('/question/questions');
    }

    static addQuestion = async (req, res) => {

        let total_option = 0;
        let { question, coding_question, optionid, option, categories_id, coding_question_chkbox } = req.body;

        for (let option_chk = 0; option_chk < option.length; option_chk++) {
            if (option[option_chk] != undefined && option[option_chk].trim() != '') {
                total_option++;
            }
        }
        if (question.trim() != '' && question != undefined) {
            if (total_option >= 4) {
                if (optionid != undefined) {
                    let que_adder, que_id;
                    if (coding_question_chkbox != undefined && coding_question != undefined && coding_question.trim() != '') {
                        que_adder = await queryExecurter(`INSERT INTO question_master (category_id, question, question_answer,isCoding) VALUES ('${categories_id}', '${question}', '${option[optionid]}', '1');`);
                        que_id = await que_adder.insertId;
                        await queryExecurter(`INSERT INTO question_coding (question_id, coding_question) VALUES ('${que_id}', '${coding_question}');`);
                    }
                    else {
                        que_adder = await queryExecurter(`INSERT INTO question_master (category_id, question, question_answer,isCoding) VALUES ('${categories_id}', '${question}', '${option[optionid]}', '0');`);
                        que_id = que_adder.insertId;

                    }
                    for (let index = 0; index < option.length; index++) {
                        if (option[index] != undefined && option[index] != null && option[index].trim() != '') {
                            await queryExecurter(`INSERT INTO option_master (question_id, option_value) VALUES ('${que_id}', '${option[index]}');`);
                        }
                    }
                }
                else {
                    res.end("select right answer");
                }
            }
            else {
                res.end("less than 4 options selected");
            }
        }
        else {
            res.end("else part");
        }
        res.redirect('/question/questions')
    }

    static displayQuestion = async (req, res) => {

        const categoryId = req.query.category || 1;

        const optionTitle = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        //get all question category 
        let questionCategories = await queryExecurter(`SELECT * FROM exam_admin.question_category;`);


        const question_category = await queryExecurter(`SELECT question_category.category_name,question_category.category_id FROM exam_admin.question_category;`);

        const questionQuery = `SELECT * FROM exam_admin.question_master where question_master.isDeleted=1 and question_master.category_id=${categoryId}`

        const allQuestions = await queryExecurter(questionQuery);
        const questions = [];

        for (let i = 0; i < allQuestions.length; i++) {

            const question_options = await queryExecurter(`SELECT * FROM exam_admin.option_master where question_id=${allQuestions[i].question_id}`);


            var options = [];

            var trueOption = [];

            for (let j = 0; j < question_options.length; j++) {
                let optionMapping = {};
                if (allQuestions[i].question_answer == question_options[j].option_value) {
                    trueOption.push(true);
                } else {
                    trueOption.push(false);
                }
                optionMapping.option_id = question_options[j].option_id;
                optionMapping.option = question_options[j].option_value;
                options[j] = question_options[j].option_value;

            }



            questions[i] = {
                "question_id": allQuestions[i].question_id,
                "question": allQuestions[i].question,
                "answer": allQuestions[i].question_answer,
                "option": options,
                "correct_ans": trueOption
            }
        }
        res.render('questions', { questions: questions, optionTitle, categories: question_category, questionCategories: questionCategories });
    }
    
    static displayCategoryQuestion = async (req, res) => {

        const categoryId = req.query.category || 1;
        const optionTitle = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        //get all question category 
        let questionCategories = await queryExecurter(`SELECT * FROM exam_admin.question_category;`);


        const question_category = await queryExecurter(`SELECT question_category.category_name,question_category.category_id FROM exam_admin.question_category;`);

        const questionQuery = `SELECT * FROM exam_admin.question_master where question_master.isDeleted=1 and question_master.category_id=${categoryId}`
        const allQuestions = await queryExecurter(questionQuery);
        const questions = [];

        for (let i = 0; i < allQuestions.length; i++) {

            const question_options = await queryExecurter(`SELECT * FROM exam_admin.option_master where question_id=${allQuestions[i].question_id}`);


            var options = [];

            var trueOption = [];

            for (let j = 0; j < question_options.length; j++) {
                let optionMapping = {};
                if (allQuestions[i].question_answer == question_options[j].option_value) {
                    trueOption.push(true);
                } else {
                    trueOption.push(false);
                }
                optionMapping.option_id = question_options[j].option_id;
                optionMapping.option = question_options[j].option_value;
                options[j] = question_options[j].option_value;

            }



            questions[i] = {
                "question_id": allQuestions[i].question_id,
                "question": allQuestions[i].question,
                "answer": allQuestions[i].question_answer,
                "option": options,
                "correct_ans": trueOption
            }

        }
        res.json({ questions: questions, optionTitle, categories: question_category, questionCategories: questionCategories });

    }


    static question = async (req, res) => {
        const id = req.query.id;
        const questionData = await queryExecurter(`SELECT * FROM exam_admin.question_master where question_master.question_id=${parseInt(id)}`);

        const questionoption = await queryExecurter(`SELECT option_master.option_id,option_master.option_value FROM exam_admin.option_master where option_master.question_id=${parseInt(id)}`);

        res.json({ questionData: questionData[0], questionOption: questionoption });
    }





}

module.exports = QuestionController;