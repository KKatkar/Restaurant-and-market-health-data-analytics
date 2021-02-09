const database = require('../services/database.js');
 
const baseQuery = 
 `
  `; //Not required in this case
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.emp_id = context.id;
 
    query = `
SELECT risk, category, count
FROM
(
SELECT p_risk_type as risk, p_category as category, count(p_category) as count
FROM inspection
WHERE p_category like'%FOOD MKT%' and emp_id = :emp_id
GROUP BY p_risk_type, p_category
)
UNION
(
SELECT p_risk_type as risk, p_category as category, count(p_category) as count
FROM inspection
WHERE p_category like'%RESTAURANT%' and emp_id = :emp_id
GROUP BY p_risk_type, p_category 
)
`;
	
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;