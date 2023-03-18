const con = require('../src/config');
const util = require('util');

class addCategory{

    static addCategory = async (req,res) =>{
        var category_name = req.body.category_name;
        
          con.query(`INSERT INTO question_category(category_name) values('${category_name.toUpperCase()}');`,(err,inserted_category_name)=>{
          if(err) throw err
          
            console.log(inserted_category_name);
            res.json(inserted_category_name);
          
       })
      }
 
     static verifyCategory = async (req,res) => {
 
       var query = util.promisify(con.query).bind(con);
       var verifyCategory  =  await query(`SELECT category_name FROM question_category;`);   
       console.log("category names",verifyCategory);
       res.json(verifyCategory.map(name=>name.category_name));
 
     }
}

module.exports = addCategory;