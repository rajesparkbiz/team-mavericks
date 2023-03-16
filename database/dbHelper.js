const con = require('../database/dbconnect.js');

const queryExecurter = (query) => {
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

module.exports=queryExecurter;
