const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  const binds = {};
  let query=``;
  if (context.id) {
    binds.emp_id = context.id;
 
    query = `select count(ins_id) as "count_ins"
 from service
 where ins_id in  (select ins_id from inspection where emp_id = :emp_id)`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;