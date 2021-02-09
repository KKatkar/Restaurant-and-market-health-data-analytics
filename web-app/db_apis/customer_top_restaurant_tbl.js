const database = require('../services/database.js');

const baseQuery =
 `
  `;

async function find(context) {
  let query = baseQuery;
  query = `
SELECT f.F_ID as Facility_ID, f.F_NAME as Name, f.address_id, i.ins_score as Score, i.ins_grade as Grade
from Facility f, Inspection i
where i.f_id = f.f_id and trim(p_category) = 'RESTAURANT' and trim(p_seats) = '151 +' and trim(p_risk_type) = 'LOW RISK'
ORDER BY ins_score DESC
FETCH FIRST 3 ROWS ONLY`;

  const result = await database.simpleExecute(query);

  return result.rows;
}

module.exports.find = find;
