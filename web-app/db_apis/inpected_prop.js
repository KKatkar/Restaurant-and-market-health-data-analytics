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
select distinct(facility.f_name) as "f_name"
from inspection, facility
where emp_id = :emp_id and inspection.f_id  = facility.f_id
ORDER BY facility.f_name ASC

`;

	
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;