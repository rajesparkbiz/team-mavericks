const mysql=require('mysql2');
require('dotenv').config();
const database=process.env.DATABASE;

const con=mysql.createConnection({
    host:"localhost",
    port:3306,
    password:"root",
    user:"root",
    database:database
});

con.connect(()=>{
    console.log(`${process.env.DATABASE} database Connect Successfully`);
})


module.exports=con;