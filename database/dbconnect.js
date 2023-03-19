const mysql = require('mysql2');
const sqlconnection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database: "exam_admin",
});
module.exports= sqlconnection;