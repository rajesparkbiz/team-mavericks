const dbHelper = require('../database/dbHelper.js');
const queryExecurter = require('../database/dbHelper.js');
class StdentQuestion {
    static UserQuestion = async (req, res) => {

        const questionQuery = `SELECT * FROM exam_admin.question_master;`
        const allQuestions = await queryExecurter(questionQuery);
        const questions = [];

        for (let i = 0; i < allQuestions.length; i++) {

            const question_options = await queryExecurter(`SELECT * FROM exam_admin.option_master where question_id=${allQuestions[i].question_id}`);
            
            var options = [];

            var trueOption=[];

            for (let j = 0; j < question_options.length; j++) {
                if(allQuestions[i].question_answer == question_options[j].option_value){
                    trueOption.push(true);
                }else{
                    trueOption.push(false);
                }
                options[j] = question_options[j].option_value;
            }

            questions[i] = {
                "question": allQuestions[i].question,
                "answer": allQuestions[i].question_answer,
                "option": options,
                "correct_ans":trueOption
            }
        }
        res.render('questions', { questions: questions });
    }
}


module.exports = StdentQuestion;