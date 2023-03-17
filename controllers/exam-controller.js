const con = require('../src/config');
const util = require('util');

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

     static addCategory = async (req,res) =>{
       var category_name = req.body.category_name;

       con.query(`INSERT INTO question_category(category_name) values('${category_name}');`,(err,inserted_category_name)=>{
         if(err) throw err
         
         console.log(inserted_category_name);

         res.redirect('/exam/showcategory')
      })
     }

    static verifyCategory = async (req,res) => {

      var query = util.promisify(con.query).bind(con);
      var verifyCategory  =  await query(`SELECT category_name FROM question_category;`);   
      console.log("category names",verifyCategory);
      res.json(verifyCategory.map(name=>name.category_name));

    }
}

module.exports= createExams;