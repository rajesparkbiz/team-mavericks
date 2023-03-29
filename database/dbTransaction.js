const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createPool(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD
    }
)


class dbTransaction {
    static async queryExec(id,args, querytype) {
        let con = await connection.getConnection();
        let result = [];
        let updatedQuery;
        let insertedId;
        try {
            await con.beginTransaction();
            if (querytype == 'insert') {
                for (let index = 0; index < args.length; index++) {
                    if (index == 0) {
                        result[index] = await con.execute(args[index]);
                        insertedId = result[index][id]['insertId'];
                        console.log("hello: " + insertedId);
                    }
                    else {
                        let updatedQuery1 = args[index].toString().split("lastQuestionId");
                        for (let k = 0; k < updatedQuery1.length; k++) {
                            if (k == 0) {
                                updatedQuery = updatedQuery1[k];
                            }
                            else {
                                updatedQuery += insertedId;
                                updatedQuery += updatedQuery1[k];
                                console.log(updatedQuery);
                                result[index] = await con.execute(updatedQuery);
                            }
                        }
                    }
                }
            } else if (querytype == 'update' || querytype == 'delete') {
                for (let k = 0; k < args.length; k++) {
                    await con.execute(args[k]);
                }
            }
            await con.commit();
        } catch (err) {
            if (con) {
                await con.rollback();
            }
            console.log(err);
        } finally {
            if (con) {
                con.release();
            }
        }
    }
}

module.exports = dbTransaction;