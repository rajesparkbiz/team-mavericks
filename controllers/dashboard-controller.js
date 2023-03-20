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
    
    static dashboardPage = async(req,res)=>{
        var data = [];

        var categories = await queryExecurter(`select count(*) as totalCategories from exam_admin.question_category`);
        data[0] = categories[0].totalCategories;
    
        var exam = await queryExecurter(`select count(*) as exams from exam_admin.exam_master`);
        data[1] = exam[0].exams;
    
        var que = await queryExecurter(`select count(*) as totalQuestion from exam_admin.question_master`);
        data[2] = que[0].totalQuestion;
    
        var user = await queryExecurter(`SELECT count(*) as students FROM exam_admin.student_master;`);
        data[3] = user[0].students;
    
    
    
        var category = await queryExecurter(`SELECT * FROM exam_admin.question_category;`);
    
        data[4] = category;
    
        let questionsRatio = [];

        for (let i = 0; i < data[4].length; i++) {
    
            const id = data[4][i].category_id;
    
            var que = await queryExecurter(`SELECT count(*) as questions FROM exam_admin.question_master where question_master.category_id=${id}`);
    
            const questionCount = que[0].questions;
            questionsRatio[i] = `width:${Math.floor((questionCount / data[4].length) * 10)}%`;
        }
    
        const exam_attempt = await queryExecurter(`SELECT * FROM exam_admin.exam_attempt_master`);
        var s_id = req.body.student_id;
    
        var student_name = await queryExecurter(`select student_master.fname from student_master inner join  exam_attempt_master on exam_attempt_master.student_id=student_master.student_id `);

        res.render('dashboard', { data: data, questionsRatio: questionsRatio, exam_attempt: exam_attempt, student_name });
    }

    static displayExams=async(req,res)=>{
        var exam_master = await queryExecurter(`SELECT * FROM exam_master`);
        res.render('exam.ejs', { data: exam_master });
    }
}


module.exports = StdentQuestion;