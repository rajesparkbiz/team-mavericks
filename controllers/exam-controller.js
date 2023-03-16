var mysql2 = require('mysql2')

var conn = mysql2.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'project'
})

conn.connect((err) => {
    if (err) throw err
    console.log('connected!')
})


class ExamController{
    static create_exam = async(req,res)=>{
        // let x = req.body.examname
        // let y = req.body.examcode
        // let z = req.body.totalque
        // conn.query(`insert into exam_master(exam_name,exam_access_code,exam_total_question) values('${x}','${y}','${z}')`)
        res.render('create_exam')
    }
}

module.exports=ExamController;