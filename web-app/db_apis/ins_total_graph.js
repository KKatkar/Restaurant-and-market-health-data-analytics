const database = require('../services/database.js');
 
const baseQuery = 
 `
  `; //Not required inn this case
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.emp_id = context.id;
 
    query = `SELECT "mth_name", 
       "avg_score" 
FROM   (SELECT To_char(To_date(ins_activity_date), 'Month') AS "mth_name", 
               To_char(To_date(ins_activity_date), 'mm')    AS "mth_no", 
               To_char(To_date(ins_activity_date), 'yy')    AS "yr_no", 
               Round(Avg(ins_score), 1)                     AS "avg_score" 
        FROM   inspection 
        WHERE  ins_id IN (SELECT ins_id 
                        FROM   inspection 
                        WHERE  emp_id = :emp_id) 
        GROUP  BY To_char(To_date(ins_activity_date), 'Month'), 
                  To_char(To_date(ins_activity_date), 'mm'), 
                  To_char(To_date(ins_activity_date), 'yy') 
        ORDER  BY To_char(To_date(ins_activity_date), 'yy') DESC, 
                  To_char(To_date(ins_activity_date), 'mm') ASC) 
WHERE  "yr_no" = (SELECT Max (To_char(To_date(ins_activity_date), 'yy')) 
                  FROM   inspection) 
`;
	
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;