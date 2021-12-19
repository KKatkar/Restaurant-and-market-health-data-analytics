const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  const binds = {};
  let query=``;
  if (context.id) {
    binds.emp_id = context.id;
 
    query = `SELECT ROUND(avg(ins_score),2) as "avg_score"
 from inspection
 where ins_id in  (select ins_id from inspection where emp_id = :emp_id)`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;