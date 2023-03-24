const queryExecurter = require('../database/dbHelper.js');
class ExamController {
    static toogleSwitch = async (req, res) => {
        const currentStatus = await queryExecurter(`SELECT exam_master.exam_isActive as status FROM exam_admin.exam_master where exam_master.exam_id=${req.query.id}`);
        const isActive = currentStatus[0].status;

        var query= `update exam_admin.exam_master set exam_isActive = '${isActive=='yes' ? 'no':'yes'}' where exam_id=${req.query.id}`;
        
        const toggleSwitchQuery = await queryExecurter(query);

        res.redirect('/dashboard/exams');
    }

    static createExam = async (req, res) => {
        res.render('create-exam' );
    }
    static choosedQuestions = async (req, res) => {

        const examId=req.query.exam_id;
        var choosedCategory=[];
        
        const examResult=await queryExecurter(`select exam_category.category_id from exam_category where exam_category.exam_id=${examId}`);

        for(let i=0;i<examResult.length;i++){
            var categoryMap=[];
            const categoryName=await queryExecurter(`SELECT question_category.category_name,question_category.category_id FROM question_category where question_category.category_id=${examResult[i].category_id}`);
        
            choosedCategory[i]={
                "category":categoryName[0].category_name,
                "category_id":categoryName[0].category_id
            }
        }


        //for default first category questions
        const categoryId=choosedCategory[0].category_id;

        var categoryQuestions=[];
        
        const questionsResult=await queryExecurter(`select exam_category.question_id from exam_category where exam_category.exam_id=${examId} and exam_category.category_id=${categoryId}`);

        const questionsId=questionsResult[0].question_id.split(",");
        


        for(let i=0;i<questionsId.length;i++){
            const query=`SELECT question_master.question FROM question_master where question_master.question_id=${questionsId[i]}`;

           
            const question=await queryExecurter(query);
            categoryQuestions[i]=question[0].question;
        }

        res.render('choosed-question',{categories:choosedCategory,exam_id:examId,categoryQuestions:categoryQuestions,questionCount:questionsId.length});
    }

    static displaychoosedQuestion =async(req,res)=>{
        const examId=req.query.examId;
        const categoryId=req.query.categoryId;

        var categoryQuestions=[];
        
        const questionsResult=await queryExecurter(`select exam_category.question_id from exam_category where exam_category.exam_id=${examId} and exam_category.category_id=${categoryId}`);

        const questionsId=questionsResult[0].question_id.split(",");

        for(let i=0;i<questionsId.length;i++){
            const query=`SELECT question_master.question FROM question_master where question_master.question_id=${questionsId[i]}`;

           
            const question=await queryExecurter(query);
            categoryQuestions[i]=question[0].question;
        }
        res.json({categoryQuestions,questionCount:questionsId.length});
    }


}

module.exports = ExamController;