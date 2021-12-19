const database = require('../services/database.js');
 
const baseQuery = 
 `
select f_name as "f_name" from facility  

`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
	
    binds.o_id = context.id;
	
    query = `
select f_name as "f_name",count(v_code) as "v_cnt" from (
select f.f_name,ins.ins_id,vo.v_code from inspection ins
inner join 
(select f_id,f_name from facility where o_id=:o_id)f
on ins.f_id = f.f_id
inner join
violation vo
on ins.ins_id = vo.ins_id
)group by f_name

 `;


  }
 
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}
 
module.exports.find = find;