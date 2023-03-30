const queryExecurter = require('../database/dbHelper.js');
const QueryHelper = require('../services/databaseQuery');

class ChartController {
    static displayChart = async (req, res) => {
        var category=await QueryHelper.selectQuery('question_category','*',true,false);

        let questionsRatio = [];

        const defaultData = ['Category', 'Question Per Catgory'];

        questionsRatio[0] = defaultData;

        for (let i = 1; i < category.length; i++) {
            const data = [];

            data.push(category[i-1].category_name);

            const id = category[i-1].category_id;

            
            var que=await QueryHelper.selectQuery('question_master','count(*) as questions',true,true,'category_id',`${id}`,'=');

            const questionCount = que[0].questions;
            data.push(questionCount);
            questionsRatio[i] = data;
        }
        res.json(questionsRatio);
    }

    static displayTimeLine =async(req,res)=>{
        var category = await queryExecurter(`SELECT * FROM question_category;`);
    
        
        let questionsRatio = [];

        for (let i = 0; i < category.length; i++) {
    
            const id = category[i].category_id;
    
            var que = await queryExecurter(`SELECT count(*) as questions FROM question_master where question_master.category_id=${id}`);

           
            const questionCount = que[0].questions;
            questionsRatio[i] = `width:${Math.floor((questionCount / category.length) * 10)}%`;
        }   

        
        res.json({category,questionsRatio});
    }
}
module.exports = ChartController;