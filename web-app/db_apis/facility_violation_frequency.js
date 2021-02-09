const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f_id = context.id;
 
    query = `select v_description as "v_desc" , count(*) as "v_cnt" from 
(select * from inspection where f_id=:f_id) ins inner join violation vo on ins.ins_id = vo.ins_id
group by v_description`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;