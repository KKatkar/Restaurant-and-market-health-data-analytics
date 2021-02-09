const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f_id = context.id;
 
    query = `
select f_name as "f_name", street as "street",city as "city",st as "st",zip as "zip" from (
select f_name,address_id from facility  where f_id = :f_id)f
inner join
address a 
on 
 f.address_id= a.address_id`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;