var mysql2 = require('mysql2')
var conn = mysql2.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'exam_admin'
})

conn.connect((err) => {
    if (err) throw err
    console.log('connected!')
})

var question = async (req,res)=>{
    conn.query(`select category_name from question_category`,(err,data)=>{
        if(err) throw err;
        console.log(data)
            res.render('nextpage',{data:data})
    })
}

var addCategory = async(req,res)=>{
    let category = req.query.category;
    conn.query(`insert into question_category(category_name) values('${category}')`,(err,data)=>{
        if(err) throw err;
        res.json(data);
    })
}


module.exports = {question,addCategory};