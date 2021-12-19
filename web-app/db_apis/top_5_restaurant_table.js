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
Select F_name, "Score"
From
(
SELECT F_ID, round(avg(ins_score),2) as "Score"
		FROM inspection 
		where emp_id = :emp_id
		Group by F_ID 
		Order by round(avg(ins_score),2) desc 
) tab1, facility tab2
WHERE tab1.f_id = tab2.f_id
Fetch first 10 rows only
`;

	
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;