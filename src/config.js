
const mysql = require('mysql2');

var con = mysql.createConnection({

    host :"localhost",
    user: "root",
    password: "root",
    database : "exam_portal",

});

con.connect((err)=>{
    if(err) throw err;
    console.log("You are connected with exam portal databse");
})

module.exports = con;

