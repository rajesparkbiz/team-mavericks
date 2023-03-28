const queryExecuter=require('../database/dbHelper.js');
class QueryHelper{
    static fetchAllData=async(tableName)=>{
        return await queryExecuter(`SELECT * FROM ${tableName};`);
    }
}

module.exports=QueryHelper;