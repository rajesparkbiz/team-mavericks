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

class ExamController {
    static create_exam = async (req, res) => {
        // console.log('hello')
        res.render('create_exam')
    }

    static data = async (req, res) => {
        try{
        let x = req.body.examname
        let y = req.body.examcode
        let z = req.body.totalque
        let w = req.body.duration
        console.log(x, y, z,w)
        conn.query(`insert into exam_master(exam_name,exam_access_code,exam_total_question,exam_duration) values('${x}','${y}','${z}','${w}')`)
        res.render('nextpage')
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = {ExamController};