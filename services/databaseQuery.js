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
    else {
        throw new Error('type of cols and type of values have different data types!');
    }
}
function colsHandler(cols) {
    let all_cols;
    for (let index = 0; index < cols.length; index++) {
        if (typeof (cols) == 'string') {
            all_cols = cols;
            return all_cols;
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
    return all_cols;
}
function valuesHandler(values) {
    let all_values;
    for (let index = 0; index < values.length; index++) {
        if (typeof (values) == 'string') {
            all_values = `'${values}'`;
            return all_values;
        }
        else {
            if (index == 0) {
                all_values = `'${values[index]}'`
            }
            else {
                all_values += `,'${values[index]}'`
            }
        }
    }
    return all_values;
}
function selectColsHandler(cols, tname) {
    let all_cols, queryWithoutWhere;
    all_cols = colsHandler(cols);
    queryWithoutWhere = `SELECT ${all_cols} FROM ${tname}`;
    return queryWithoutWhere;
}

async function insertQueryExecuter(tname, cols, values, isExecute) {
    if (isExecute) {
        let all_cols = colsHandler(cols);
        let all_values = valuesHandler(values);
        let result = await queryExecuter(`INSERT INTO ${tname} (${all_cols}) VALUES (${all_values});`);
        return result;
    }
    else {
        let all_cols = colsHandler(cols);
        let all_values = valuesHandler(values);
        let result = `INSERT INTO ${tname} (${all_cols}) VALUES (${all_values});`;
        return result;
    }
}
class QueryHelper {
    
    static async selectQuery(tname, cols, isExecute, isWhere, WhereFields, whereValue, whereOperator, condition) {
        if (isWhere) {
            let whereQuery = await whereHandler(WhereFields, whereValue, whereOperator, condition, false)
            if (whereQuery == 'string') {
                if (isExecute) {
                    let queryWithoutWhere = selectColsHandler(cols, tname);
                    let result = await queryExecuter(`${queryWithoutWhere} WHERE ${WhereFields} ${whereOperator} '${whereValue}'`);
                    return result;
                } else {
                    let queryWithoutWhere = selectColsHandler(cols, tname);
                    let result = `${queryWithoutWhere} WHERE ${WhereFields} ${whereOperator} '${whereValue}'`;
                    return result;
                }
            }
            else {
                if (isExecute) {
                    let queryWithoutWhere = selectColsHandler(cols, tname);
                    let result = await queryExecuter(`${queryWithoutWhere} ${whereQuery}`);
                    return result;
                }
                else {
                    let queryWithoutWhere = selectColsHandler(cols, tname);
                    let result = `${queryWithoutWhere} ${whereQuery}`;
                    return result;
                }
            }
        } else {
            if (isExecute) {
                let queryWithoutWhere = selectColsHandler(cols, tname);
                let result = await queryExecuter(queryWithoutWhere);
                return result;
            }
            else {
                let queryWithoutWhere = selectColsHandler(cols, tname);
                let result = queryWithoutWhere;
                return result;
            }
        }
    };

    static async updateQuery(tname, updatedFields, updatedValue, WhereFields, whereValue, whereOperator, isExecute, condition) {
        let queryWithoutWhere = await whereHandler(updatedFields, updatedValue, '=', ',', true);
        
        let whereQuery = await whereHandler(WhereFields, whereValue, whereOperator, condition, false)
        if (whereQuery == 'string') {
            if (isExecute) {
                if (queryWithoutWhere == 'string') {
                    let result = await queryExecuter(`UPDATE ${tname} SET ${updatedFields} = '${updatedValue}' WHERE ${WhereFields} ${whereOperator} '${whereValue}'`);
                    return result;
                }
                else{
                    let result = await queryExecuter(`UPDATE ${tname} ${queryWithoutWhere} WHERE ${WhereFields} ${whereOperator} '${whereValue}'`);
                    return result;
                }
            }
            else {
                if (queryWithoutWhere == 'string') {
                    let result = `UPDATE ${tname} SET ${updatedFields} = '${updatedValue}' WHERE ${WhereFields} ${whereOperator} '${whereValue}'`;
                    return result;
                }
                else{
                    let result = `UPDATE ${tname} ${queryWithoutWhere} WHERE ${WhereFields} ${whereOperator} '${whereValue}'`;
                    return result;
                }
            }
        }
        else {
            if (isExecute) {
                let result = await queryExecuter(`UPDATE ${queryWithoutWhere} ${whereQuery}`);
                return result;
            }
            else {
                let result = `UPDATE ${queryWithoutWhere} ${whereQuery}`;
                return result;
            }
        }
    }

    static async insertQuery(tname, cols, values, isExecute) {
        let result;
        if (typeof (cols) == typeof (values)) {
            if (typeof (cols) == 'string') {
                result = await insertQueryExecuter(tname, cols, values, isExecute);
            }
            else {
                if (cols.length == values.length) {
                    result = await insertQueryExecuter(tname, cols, values, isExecute);
                }
                else {
                    throw new Error('no of cols and no of conditions are not Equal!');
                }
            }
            return result;
        }
        else {
            throw new Error('type of cols and type of values have different data types!');
        }
    }
}
module.exports = QueryHelper;