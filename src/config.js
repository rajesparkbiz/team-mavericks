
const mysql = require('mysql2');

var con = mysql.createConnection({

    host :"localhost",
    user: "root",
    password: "",  // you have to reset it to root at office right now i m working from home
    database : "exam_admin",

});

con.connect((err)=>{
    if(err) throw err;
    console.log("You are connected with exam admin");
})

module.exports = con;

