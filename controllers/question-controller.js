const e = require('express');
const queryExecurter = require('../database/dbHelper.js');
const question_config = require('../public/js/question-config.js');
const dbTransaction = require('../database/dbTransaction.js');
const QueryHelper = require('../services/databaseQuery');
const con = require('../database/dbconnect.js');
const multer = require('../config/multer-config.js');
const { storage } = require('googleapis/build/src/apis/storage/index.js');

class QuestionController {

    static deleteQuestion = async (req, res) => {
        const questionId = req.query.id;
        if (questionId) {
            // const deleteQuery = await queryExecurter(`UPDATE question_master SET isDeleted = '0' WHERE question_id = '${questionId}';
            // `);
            const deleteQuery = await QueryHelper.updateQuery('question_master', 'isDeleted', '0', 'question_id', `${questionId}`, '=', true);

            res.json({ msg: "Deleted successfully" });
        }

    }

    static updateQuestion = async (req, res) => {

        const { questionId, question, questionAnswer, questionOptions, optionsId, filename } = req.body;

        if (filename != null || filename != undefined) {
       
            const updateQuery = await QueryHelper.updateQuery('question_master', ['question', 'question_answer', 'isImage'], [`${question}`, `${questionAnswer}`, `${filename}`], 'question_id', `${questionId}`, '=', true);
        } else {
            const updateQuery = await QueryHelper.updateQuery('question_master', ['question', 'question_answer'], [`${question}`, `${questionAnswer}`], 'question_id', `${questionId}`, '=', true);
        }

        for (let i = 0; i < questionOptions.length; i++) {
            const updateOptionQuery = await queryExecurter(`UPDATE option_master SET option_value = '${questionOptions[i]}' WHERE option_id = ${optionsId[i]}`);
        }
        res.redirect('/question/questions');
    }

    static addQuestion = async (req, res) => {

        const image = req.file ? req.file.filename : "";
        
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
                    let que_adder = [], que_id;
                    if (coding_question_chkbox != undefined && coding_question != undefined && coding_question.trim() != '') {
                        que_adder[0] = await QueryHelper.insertQuery('question_master', ['category_id', 'question', 'question_answer', 'isCoding'], [categories_id, question, option[optionid], '1'], false);
                        que_adder[1] = await QueryHelper.insertQuery('question_coding', ['question_id', 'coding_question'], ['lastQuestionId', coding_question], false);
                    }
                    else {

                        que_adder[0] = await QueryHelper.insertQuery('question_master', ['category_id', 'question', 'question_answer', 'isCoding', 'isImage'], [categories_id, question, `${option[optionid]}`, '0', `${image}`], false);
                    }
                    let optionCounter = (que_adder.length);
                    for (let index = 0; index < option.length; index++) {
                        if (option[index] != undefined && option[index] != null && option[index].trim() != '') {

                            que_adder[optionCounter] = await QueryHelper.insertQuery('option_master', ['question_id', 'option_value'], ['lastQuestionId', `${option[index]}`], false);
                            optionCounter++;
                        }
                    }
                    await dbTransaction.queryExec(0, que_adder, 'insert');
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


        let questionCategories = await QueryHelper.selectQuery('question_category', '*', true, false);


        let cols = ['category_name', 'category_id'];
        const question_category = await QueryHelper.selectQuery('question_category', cols, true, false);

        const allQuestions = await QueryHelper.selectQuery('question_master', '*', true, true, ['isDeleted', 'category_id'], ['1', categoryId], '=', 'AND');
        const questions = [];

        for (let i = 0; i < allQuestions.length; i++) {


            const question_options = await QueryHelper.selectQuery('option_master', '*', true, true, 'question_id', `${allQuestions[i].question_id}`, '=');

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
                "correct_ans": trueOption,
                "image": allQuestions[i].isImage
            }
        }
        res.render('questions', { questions: questions, optionTitle, categories: question_category, questionCategories: questionCategories });
    }

    static displayCategoryQuestion = async (req, res) => {

        const categoryId = req.query.category || 1;
        const examId = req.query.examId || 1;
        const optionTitle = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


        let questionCategories = await QueryHelper.selectQuery('question_category', '*', true, false);
        const question_category = await QueryHelper.selectQuery('question_category', ['category_name', 'category_id'], true, false);
        const allQuestions = await QueryHelper.selectQuery('question_master', '*', true, true, ['isDeleted', 'category_id'], ['1', categoryId], '=', 'AND');

        const questions = [];


        for (let i = 0; i < allQuestions.length; i++) {


            const question_options = await QueryHelper.selectQuery('option_master', '*', true, true, 'question_id', `${allQuestions[i].question_id}`, '=');


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
                "correct_ans": trueOption,
                "image": allQuestions[i].isImage
            }

        }
        res.json({ questions: questions, optionTitle, categories: question_category, questionCategories: questionCategories, examId: examId });

    }

    //use for default selected question
    static displaySelectedQuestion = async (req, res) => {

        const categoryId = req.query.category || 1;
        const examId = req.query.examId;


        let questionCategories = await QueryHelper.selectQuery('question_category', '*', true);
        const question_category = await QueryHelper.selectQuery('question_category', ['category_name', 'category_id'], true, false);


        //case 1


        const allQuestions = await QueryHelper.selectQuery('question_master', '*', true, true, ['isDeleted', 'category_id'], ['1', categoryId], '=', 'AND');
        var questions = [];


        for (let i = 0; i < allQuestions.length; i++) {
            questions[i] = {
                "question_id": allQuestions[i].question_id,
                "question": allQuestions[i].question,
            }
        }



        //get all questions ids for filter selected questions
        var allQuestionIds = [];
        for (let i = 0; i < allQuestions.length; i++) {
            allQuestionIds[i] = allQuestions[i].question_id;
        }

        const defaultQuestionIds = await QueryHelper.selectQuery('exam_category', 'question_id as id', true, true, ['exam_id', 'category_id'], [examId, categoryId], '=', 'AND');


        var defaultQuestionId = [];


        //case 2

        //any selected data are inserted or not
        if (defaultQuestionIds[0] != undefined) {

            questions = [];

            //split question id array
            defaultQuestionId = (defaultQuestionIds[0].id).split(",");

            //convert string array into number
            for (let i = 0; i < defaultQuestionId.length; i++) {
                defaultQuestionId[i] = parseInt(defaultQuestionId[i]);
            }


            //exclude selected question for exam
            var filteredArr = allQuestionIds.filter((num) => {
                return !defaultQuestionId.includes(num);
            });



            var count = 0;


            for (let i = 0; i < filteredArr.length; i++) {


                const allQuestions = await QueryHelper.selectQuery('question_master', '*', true, true, ['isDeleted', 'category_id', 'question_id'], ['1', categoryId, `${filteredArr[i]}`]);
                questions[count] = {
                    "question_id": allQuestions[0].question_id,
                    "question": allQuestions[0].question,
                }
                count++;
            }

            //case 3
        } else {

            questions = [];



            const allQuestions = await QueryHelper.selectQuery('question_master', '*', true, true, ['isDeleted', 'category_id'], ['1', categoryId]);

            for (let i = 0; i < allQuestions.length; i++) {
                questions[i] = {
                    "question_id": allQuestions[i].question_id,
                    "question": allQuestions[i].question,
                }
            }
        }

        res.json({ questions: questions, categories: question_category, questionCategories: questionCategories, examId: examId, defaultQuestionIds: defaultQuestionIds });
    }

    static question = async (req, res) => {
        const id = req.query.id;

        const questionData = await QueryHelper.selectQuery('question_master', '*', true, true, 'question_id', `${parseInt(id)}`, '=');
        const questionoption = await QueryHelper.selectQuery('option_master', ['option_id', 'option_value'], true, true, 'question_id', `${parseInt(id)}`, '=');

        res.json({ questionData: questionData[0], questionOption: questionoption });
    }

    //REQUIRED TO CHANGE QUERY
    static discardChoosedQuestion = async (req, res) => {
        const { examId, questionId, categoryId } = req.query;

        // const choosedQuestionResult = await queryExecurter(`SELECT exam_category.question_id FROM exam_category where exam_category.exam_id=${examId} and exam_category.category_id=${categoryId}`);

        const choosedQuestionResult = await QueryHelper.selectQuery('exam_category', 'question_id', true, true, ['exam_id', 'category_id'], [`${examId}`, `${categoryId}`])

        const questionIds = (choosedQuestionResult[0].question_id).split(",");

        let filterIds = questionIds.filter((id) => {
            return ![questionId].includes(id);
        })


        const updateQuestion = await queryExecurter(`update exam_category set exam_category.question_id='${filterIds}' where exam_category.exam_id=${examId} and exam_category.category_id=${categoryId}`);


        res.json();
    }
}

module.exports = QuestionController;