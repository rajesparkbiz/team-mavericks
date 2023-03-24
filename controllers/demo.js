const { query } = require("../database/dbconnect");

// const addStudent = (studentId, name, address, city) => {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => {
//             if (err) {
//                 return reject("Error occurred while getting the connection");
//             }
//             return connection.beginTransaction(err => {
//                 if (err) {
//                     connection.release();
//                     return reject("Error occurred while creating the transaction");
//                 }
//                 return connection.execute(
//                     'INSERT INTO STUDENT (STUDENT_ID,NAME) VALUES (?,?)', [studentId, name], (err) => {
//                         if (err) {
//                             return connection.rollback(() => {
//                                 connection.release();
//                                 return reject("Inserting to STUDENT table failed", err)
//                             });
//                         }
//                         return connection.execute(
//                             'INSERT INTO ADDRESS (STUDENT_ID,ADDRESS,CITY) VALUES (?,?,?)', [studentId, address, city], (err) => {
//                                 if (err) {
//                                     return connection.rollback(() => {
//                                         connection.release();
//                                         return reject("Inserting to ADDRESS table failed");
//                                     });
//                                 }
//                                 return connection.commit((err) => {
//                                     if (err) {
//                                         return connection.rollback(() => {
//                                             connection.release();
//                                             return reject("Commit failed");
//                                         });
//                                     }
//                                     connection.release();
//                                 });
//                             })

//                     });

//             });
//         });
//     });
// }

function hello2(...args) {
    console.log(args);
}
hello2(1,2,3,4,5,6);