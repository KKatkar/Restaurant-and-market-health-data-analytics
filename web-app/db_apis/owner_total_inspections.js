const database = require('../services/database.js');
 
const baseQuery = 
 `


  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.o_id = context.id;
 
    query = `
select count(distinct ins_id) as "total_inspections" from inspection where f_id in (select f_id from facility 
where o_id = :o_id)

`;

  }
 
  const result = await database.simpleExecute(query, binds);
	
  return result.rows;
}
 
module.exports.find = find;