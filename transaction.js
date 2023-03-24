// try {

//     conn.beginTransaction(async (err) => {

//         if (err) {
//             throw err;
//         }
//         else {

//             console.log("hello");
//             try {

//                 var insertinstud_master = await query(
//                 insert into student_master(fname, lname, gender, email, mobile, enrollment, qualification, city, college, birthdate, pass) values('${fname}', '${lname}', '${gen}', '${email}', '${phone}', '${enroll}', '${qualification}', '${city}', '${col}', '${dob}', '${encpass}')
//                 );

//                 console.log("hello1");

//                 var insertinuser_master = await query(
//                     insert into user_master(username, password, role) values('${email}', '${encpass}', 'student')
//                 );

//                 conn.commit(function (err) {
//                     console.log("Commiting transaction.....");
//                     if (err) {
//                         return conn.rollback(function () {
//                             throw err;
//                         });
//                     }
//                     console.log("Transaction Complete.");

//                     res.render("verifyemail", { email: email });
//                 });
//             } catch {
//                 conn.rollback();
//             }
//         }
//     });
// } catch {
//     conn.rollback((err) => {
//         throw err;
//     });
// } `

//     ` 

// we are using this dependency of mysql2 to get work done.


const mysql = require("mysql2/promise");
require("dotenv").config();
const connection = mysql.createPool(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    }

)

// transaction code.

let con = await connection.getConnection();

try {

    await con.beginTransaction();
    let ID = Number(req.session.user);

    let { basic_details, contact_info, document_info, social } = data;


    await con.execute(`insert into basic_information (employee_id,full_name,gender,birthdate,marital_status,allowed_wfh,profile_pic) values(${ID},'${basic_details.fullname}','${basic_details.gender}','${basic_details.dob}','${basic_details.m_status}',${Number(basic_details.wfh)},'${uncompressed_files[0]}')`);
    await con.execute(`insert into contact_information (employee_id,contact_no,emergency_contact,emergency_person_name,permenant_address,current_address) values(${ID},'${contact_info.contact}','${contact_info.emergency_contact}','${contact_info.emergency_person}','${contact_info.permanent_address}','${contact_info.current_address}')`);
    await con.execute(`insert into documents (employee_id,aadhar_path,pancard_path,cheque_path,resume_path,aadhar_no,pancard_no,cheque_no) values(${ID},'${uncompressed_files[1]}','${uncompressed_files[2]}','${uncompressed_files[3]}','${uncompressed_files[4]}','${document_info.aadhar_number}','${document_info.pan_num}','${document_info.cheque_num}')`);
    await con.execute(`insert into social_information (employee_id,twitter,linkedin,github,facebook) values(${ID},'${social.twitter}','${social.linkedin}','${social.github}','${social.facebook}')`);


    res.status(200).json({ msg: "data Stored", status: 200 });
    await con.commit();

}
  
catch (err) {
    if (con) {
        await con.rollback();
    }
    console.log(err);
    res.status(500).json({ msg: "Somethig went wrong", status: 500 });
} finally {
    if (con) {
        con.release();
    }
}