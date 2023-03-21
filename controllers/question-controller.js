const queryExecurter = require('../database/dbHelper.js');

class QuestionController{
    static deleteQuestion= async(req,res)=>{
        const  questionId=req.query.id;
        if(questionId){
            const deleteQuery=await queryExecurter(`UPDATE exam_admin.question_master SET isDeleted = '0' WHERE question_id = '${questionId}';
            `);
            res.json({msg:"Deleted Successfully"});
        }
        res.json({msg:"Deleted unsuccessful"});
    }
    static updateQuestion = async(req,res)=>{
        const {questionId,question,questionAnswer,questionOptions,optionsId}=req.body;

        const updateQuery=await queryExecurter(`UPDATE exam_admin.question_master SET question = '${question}', question_answer = '${questionAnswer}' WHERE question_id = '${questionId}'`)

        for(let i=0;i<questionOptions.length;i++){
            const updateOptionQuery=await queryExecurter(`UPDATE exam_admin.option_master SET option_value = '${questionOptions[i]}' WHERE option_id = ${optionsId[i]}`);
        }
        res.json({msg:"Updated Successfully"});
    }
    static addQuestion = async(req,res)=>{

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
                    let que_adder,que_id;
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

        res.redirect('/dashboard/allQuestions');
    }
    
}

module.exports=QuestionController;