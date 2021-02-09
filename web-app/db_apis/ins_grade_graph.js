const database = require('../services/database.js');
 
const baseQuery = 
 `
  `; //Not required inn this case
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.emp_id = context.id;
 
    query = `select ins_grade as "grade", count(ins_grade) as "grade_count"
from inspection
where ins_grade is not null and emp_id = :emp_id
group by ins_grade
order by ins_grade
`;
	
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;