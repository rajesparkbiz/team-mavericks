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
        try {
            let x = req.body.examname
            let examname = x.toUpperCase();
            let examcode = req.body.examcode
            let totalque = req.body.totalque
            let duration = req.body.duration
            // console.log(x, y, z, w)
            conn.query(`insert into exam_master(exam_name,exam_access_code,exam_total_question,exam_duration) values('${examname}','${examcode}','${totalque}','${duration}')`,(err,data)=>{
                res.render('nextpage');
            })
          
        } catch (err) {
            console.log(err);
        }
    }

    static validatename = async (req, res) => {
        try {
            let name = req.query.name;
            console.log(name);
            conn.query(`select exam_name from exam_master`,(err,data)=>{
                if(err) throw err;
                console.log(data)
                res.json(data)
            })
        } catch (err){
            console.log(err);
        }
    }

    static questionpage = async(req,res)=>{
        try{
            conn.query(`select question from question_master`,(err,data)=>{
                if(err) throw err;
                console.log(data)
                res.render('nextpage',data);
            })

        }catch(err){
            console.log(err)
        }
    }
}

module.exports = { ExamController };