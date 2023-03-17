const con = require('../src/config');


class createExams{
     static createExam = async (req,res) =>{

     }

     // function for showinf caategoires from the database
     static showCategory = async (req,res) =>{
        con.query("SELECT category_name from question_category",(err,category_list)=>{
           if(err) throw err;
            console.log(category_list);
            res.render('question-category',{category_list});
        })
        
     }

     
}

module.exports= createExams;