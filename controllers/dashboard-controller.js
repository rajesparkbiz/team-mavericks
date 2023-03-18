const queryExecurter = require('../database/dbHelper.js');
class StdentQuestion {
    static userQuestion = async (req, res) => {

        const optionTitle = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        const question_category = await queryExecurter(`SELECT question_category.category_name FROM exam_admin.question_category;`);

        const questionQuery = `SELECT * FROM exam_admin.question_master where isDeleted=1`
        const allQuestions = await queryExecurter(questionQuery);
        const questions = [];

        for (let i = 0; i < allQuestions.length; i++) {

            const question_options = await queryExecurter(`SELECT * FROM exam_admin.option_master where question_id=${allQuestions[i].question_id}`);

            
            var options = [];

            var trueOption = [];

            for (let j = 0; j < question_options.length; j++) {
                let optionMapping={};
                if (allQuestions[i].question_answer == question_options[j].option_value) {
                    trueOption.push(true);
                } else {
                    trueOption.push(false);
                }
                optionMapping.option_id=question_options[j].option_id;
                optionMapping.option=question_options[j].option_value;
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
        res.render('questions', { questions: questions, optionTitle, categories: question_category });
    }

    static question = async (req, res) => {
        const id = req.query.id;

        const questionData = await queryExecurter(`SELECT * FROM exam_admin.question_master where question_master.question_id=${parseInt(id)}`);

        const questionoption = await queryExecurter(`SELECT option_master.option_id,option_master.option_value FROM exam_admin.option_master where option_master.question_id=${parseInt(id)}`);

        res.json({ questionData: questionData[0], questionOption: questionoption });
    }
}


module.exports = StdentQuestion;