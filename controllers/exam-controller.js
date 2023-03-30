const { authPlugins } = require('mysql2');
const queryExecurter = require('../database/dbHelper.js');
const session = require('express-session');
const QueryHelper = require('../services/databaseQuery');
const { template } = require('handlebars');

var last_id;
class ExamController {

    static toogleSwitch = async (req, res) => {

        
        const currentStatus = await QueryHelper.selectQuery('exam_master','exam_isActive as status',true,true,'exam_id',`${req.query.id}`,'=');
        const isActive = currentStatus[0].status;

       
        var query = `update exam_master set exam_isActive = '${isActive == 'yes' ? 'no' : 'yes'}' where exam_id=${req.query.id}`;

        const toggleSwitchQuery = await queryExecurter(query);

        res.redirect('/dashboard/exams');
    }

    static createExam = async (req, res) => {
        res.render('create-exam');
    }

    static addExam = async (req, res) => {

        var addExam

        let { examname, examcode, totalque, duration } = req.body;

        addExam=await QueryHelper.insertQuery('exam_master',['exam_name', 'exam_access_code', 'exam_total_question', 'exam_isActive','exam_duration'],[`${examname}`, `${examcode}`, `${totalque}`, 'no',`${duration}`],true);

        res.redirect('/dashboard/exams');
    }


    static displaySelectQuestion = async (req, res) => {
      
        const categoryId = req.query.category || 1;
        const examId = req.query.exam_id;

        //get all question category 

        let questionCategories=await QueryHelper.selectQuery('question_category','*',true,false);

      
        const question_category=await QueryHelper.selectQuery('question_category',['category_name','category_id'],true,false);


        //case 1

        //get all questions for specific category


        const allQuestions=await QueryHelper.selectQuery('question_master','*',true,true,['isDeleted','category_id'],['1',`${categoryId}`],'=','AND');

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

        //get selected ids for filter
       


        const defaultQuestionIds=await QueryHelper.selectQuery('exam_category','exam_category.question_id as id',true,true,['exam_id','category_id'],[`${examId}`,`${categoryId}`],'=','AND');


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

                const allQuestions=await QueryHelper.selectQuery('question_master','*',true,true,['isDeleted','category_id','question_id'],['1',`${categoryId}`,`${filteredArr[i]}`],'=','AND');

                // const allQuestions = await queryExecurter(query);
                questions[count] = {
                    "question_id": allQuestions[0].question_id,
                    "question": allQuestions[0].question,
                }
                count++;
            }

            //case 3
        } else {

            questions = [];


          
            const allQuestions=await QueryHelper.selectQuery('question_master','*',true,true,['isDeleted','category_id'],['1',`${categoryId}`]);

    

            for (let i = 0; i < allQuestions.length; i++) {
                questions[i] = {
                    "question_id": allQuestions[i].question_id,
                    "question": allQuestions[i].question,
                }
            }
        }
        
        res.render('select-question', { questions: questions, categories: question_category, categoryId: categoryId, examId: examId, });
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

        try{
            const examResult = await QueryHelper.selectQuery('exam_category','category_id',true,true,'exam_id',`${examId}`,'=');
            if (examResult.length != 0) {
    
                for (let i = 0; i < examResult.length; i++) {
                    var categoryMap = [];
                    const categoryName = await QueryHelper.selectQuery('question_category',['category_name','category_id'],true,true,'category_id',`${examResult[i].category_id}`,'=');
    
                    choosedCategory[i] = {
                        "category": categoryName[0].category_name,
                        "category_id": categoryName[0].category_id
                    }
                }
    
    
                //for default first category questions
                const categoryId = req.query.categoryId || choosedCategory[0].category_id;
    
                var categoryQuestions = [];
    
                
                const questionsResult = await QueryHelper.selectQuery('exam_category','question_id',true,true,['exam_id','category_id'],[`${examId}`,`${categoryId}`],'=','AND');
                
                const questionsId = questionsResult[0].question_id.split(",");
                if(questionsId.length!=0 && questionsId[0]!=''){

                    for (let i = 0; i < questionsId.length; i++) {
                        
                        const question = await QueryHelper.selectQuery('question_master',['question','category_id'],true,true,'question_id',`${questionsId[i]}`,'=','AND');
                        categoryQuestions[i] = {
                            "question": question[0].question,
                            "id": questionsId[i],
                            "category": question[0].category_id
                        };
                    }
        
                    res.render('choosed-question', { categories: choosedCategory, exam_id: examId, categoryQuestions: categoryQuestions, questionCount: questionsId.length, status: true });
                }else{
                    res.render('choosed-question', { status: false });
                }
    
                
            } else {
                res.render('choosed-question', { status: false });
            }
        }catch(err){
            throw err;
        }
      

    }

    static displaychoosedQuestion = async (req, res) => {
        const examId = req.query.examId;
        const categoryId = req.query.categoryId;

        var categoryQuestions = [];

        const questionsResult=await QueryHelper.selectQuery('exam_category','question_id',true,true,['exam_id','category_id'],[`${examId}`,`${categoryId}`],'=','AND');

        const questionsId = questionsResult[0].question_id.split(",");

        for (let i = 0; i < questionsId.length; i++) {
            

            const question=await QueryHelper.selectQuery('question_master',['question','question_id'],true,true,'question_id',`${questionsId[i]}`,'=')


            categoryQuestions[i] = question[0];
        }
        res.json({ categoryQuestions, questionCount: questionsId.length });
    }

   
    static selectQuestions = async (req, res) => {
      

        const question_category=await QueryHelper.selectQuery('question_category',['category_name','category_id'],true,false);

        res.render('select-question', { categories: question_category });
    }

     //REQUIRED TO CHANGE QUERY
    static insertSelectQuestions = async (req, res) => {
        const { examid, categoryid, questions } = req.query;
        const question = questions.split(",");
        const questionCount = question.length;



        const isAvialbale=await QueryHelper.selectQuery('exam_category','exam_category.question_id as id',true,true,['exam_id','category_id'],[`${examid}`,`${categoryid}`],'=','AND');


        // make update query
        if (isAvialbale.length != 0) {
            const isAvialbales = isAvialbale[0].id;

            const ids = isAvialbales.split(",");
            ids.shift()
            for (let i = 0; i < question.length; i++) {
                ids.push(question[i]);
            }
            const isAvialbaleUpdate = await queryExecurter(`update exam_category set exam_category.question_id='${ids}' where exam_category.exam_id=${examid} and exam_category.category_id=${categoryid}`);

        } else {
            

            const result=await QueryHelper.insertQuery('exam_category',['exam_id', 'category_count', 'question_id', 'category_id'],[`${examid}`, `${questionCount}`, `${questions}`, `${categoryid}`],true);

        }
        res.json();

    }

}

module.exports = ExamController;