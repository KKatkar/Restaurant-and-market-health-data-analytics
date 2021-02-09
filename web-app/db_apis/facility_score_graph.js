const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f_id = context.id;
 
    query = `SELECT concat("mth_name", "yr_no") as "time", "yr_no", "mth_no",
       "avg_score" 
FROM   (SELECT To_char(To_date(ins_activity_date), 'Month') AS "mth_name", 
               To_char(To_date(ins_activity_date), 'mm')    AS "mth_no", 
               To_char(To_date(ins_activity_date), 'yy')    AS "yr_no", 
               Round(Avg(ins_score), 1)                     AS "avg_score" 
        FROM   inspection 
        WHERE  f_id = :f_id 
        GROUP  BY To_char(To_date(ins_activity_date), 'Month'), 
                  To_char(To_date(ins_activity_date), 'mm'), 
                  To_char(To_date(ins_activity_date), 'yy') 
        ORDER  BY To_char(To_date(ins_activity_date), 'yy') DESC, 
                  To_char(To_date(ins_activity_date), 'mm') ASC) 
                  order by "yr_no" , "mth_no"
`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;