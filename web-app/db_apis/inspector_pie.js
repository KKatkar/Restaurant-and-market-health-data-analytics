const database = require('../services/database.js');
const baseQuery = 
 `
  `; //removed base query
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.emp_id = context.id;
 
    query = ` 
	
select "v_desc", "f_cnt"
from 
(select v_description as "v_desc", count(f_id) as "f_cnt"
from violation, inspection
where violation.ins_id = inspection.ins_id and emp_id = :emp_id
group by v_description
order by count(f_id))

`;

	
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;