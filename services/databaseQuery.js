const queryExecuter = require('../database/dbHelper.js');

async function whereHandler(WhereFields, whereValue, whereOperator, condition, update) {
    let whereQuery;
    if (whereOperator == undefined || whereOperator == null) {
        whereOperator = '=';
    }
    if (typeof (WhereFields) == typeof (whereValue)) {

        if (typeof (WhereFields) == 'string') {
            return typeof (WhereFields);
        }
        else {
            if (WhereFields.length != whereValue.length) {
                throw new Error('no of cols and no of conditions are not Equal!');
            }
            else {
                if (condition == undefined || condition == null) {
                    condition = 'AND';
                }

                for (let index = 0; index < WhereFields.length; index++) {
                    if (index == 0) {
                        if (update) {
                            whereQuery = `SET ${WhereFields[index]} ${whereOperator} '${whereValue[index]}'`;
                        }
                        else {
                            whereQuery = `WHERE ${WhereFields[index]} ${whereOperator} '${whereValue[index]}'`;
                        }
                    }
                    else {
                        whereQuery += ` ${condition} ${WhereFields[index]} ${whereOperator} '${whereValue[index]}'`;
                    }
                }
                return whereQuery;
            }
        }
    }
    else{
        throw new Error('type of cols and type of values have different data types!');
    }
}
function selectColsHandler(cols, tname) {
    let all_cols, queryWithoutWhere;
    for (let index = 0; index < cols.length; index++) {
        if (typeof (cols) == 'string') {
            all_cols = cols;
            queryWithoutWhere = `SELECT ${cols} FROM ${tname}`;
            return queryWithoutWhere;
        }
        else {
            if (index == 0) {
                all_cols = `${cols[index]}`
            }
            else {
                all_cols += `,${cols[index]}`
            }
        }
    }
    queryWithoutWhere = `SELECT ${all_cols} FROM ${tname}`;
    return queryWithoutWhere;
}
class QueryHelper {
    static async selectQuery(tname, cols, isWhere, WhereFields, whereValue, whereOperator, condition) {
        if (isWhere) {
            let whereQuery = await whereHandler(WhereFields, whereValue, whereOperator, condition, false)
            if (whereQuery == 'string') {
                let queryWithoutWhere = selectColsHandler(cols, tname);
                let result = await queryExecuter(`${queryWithoutWhere} WHERE ${WhereFields} ${whereOperator} '${whereValue}'`);
                return result;
            }
            else {
                let queryWithoutWhere = selectColsHandler(cols, tname);
                let result = await queryExecuter(`${queryWithoutWhere} ${whereQuery}`);
                return result;
            }
        } else {
            let queryWithoutWhere = selectColsHandler(cols, tname);
            let result = await queryExecuter(queryWithoutWhere);
            return result;
        }
    };
    static async updateQuery(tname, updatedFields, updatedValue,WhereFields, whereValue, whereOperator, condition) {
        let queryWithoutWhere = await whereHandler(updatedFields, updatedValue, '=', ',', true);
        let whereQuery =  await whereHandler(WhereFields, whereValue, whereOperator, condition, false)
        if (whereQuery == 'string') {
            let result = await queryExecuter(`UPDATE ${tname} SET ${updatedFields} = ${updatedValue} WHERE ${WhereFields} ${whereOperator} '${whereValue}'`);
            return result;
        }
        else {
            let result = await queryExecuter(`UPDATE ${queryWithoutWhere} ${whereQuery}`);
            return result;
        }
    }
}
module.exports = QueryHelper;