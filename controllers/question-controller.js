const queryExecurter = require('../database/dbHelper.js');

class QuestionController{
    static deleteQuestion= async(req,res)=>{
        const  questionId=req.query.id;
        if(questionId){
            const deleteQuery=await queryExecurter(`UPDATE exam_admin.question_master SET isDeleted = '0' WHERE question_id = '${questionId}';
            `);
            
        }

    }
    static updateQuestion = async(req,res)=>{
        const {questionId,question,questionAnswer,questionOptions,optionsId}=req.body;

        const updateQuery=await queryExecurter(`UPDATE exam_admin.question_master SET question = '${question}', question_answer = '${questionAnswer}' WHERE question_id = '1'`)

        for(let i=0;i<questionOptions.length;i++){
            const updateOptionQuery=await queryExecurter(`UPDATE exam_admin.option_master SET option_value = '${questionOptions[i]}' WHERE option_id = ${optionsId[i]}`);
        }

        
    }
}

module.exports=QuestionController;