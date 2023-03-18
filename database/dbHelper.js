const con=require('../src/config.js');


const queryExecuter= async (query)=>{
   return new Promise((resolve,reject)=>{
    con.query(query,(err,result)=>{
        if(err){
            reject(err)
        }
        resolve(result);
    })
   })
}

module.exports=queryExecuter;