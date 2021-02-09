const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f_id = context.id;
 
    query = `select case when vo.v_description is null then " " else vo.v_description end as "vio" from inspection ins inner join violation vo on ins.ins_id = vo.ins_id where ins.f_id= :f_id and vo.v_points>3`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;