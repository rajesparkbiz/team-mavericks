const sqlconnection=require('../database/dbconnect.js');
function querySolver(query) {
    return new Promise((resolve, reject) => {
        sqlconnection.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    })
}
module.exports=querySolver;
