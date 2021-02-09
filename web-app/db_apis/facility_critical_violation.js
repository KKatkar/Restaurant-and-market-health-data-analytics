const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f_id = context.id;
 
    query = `SELECT case when crt_cnt is null then  0 else crt_cnt end as "crt_cnt" from (SELECT Sum(v_cnt) AS crt_cnt 
FROM   (SELECT f_id, 
               sem, 
               yr_no, 
               Count(v_code) AS v_cnt 
        FROM   (SELECT ins_id, 
                               f_id, 
                               v_code, 
                               yr_no, 
                               Concat(CASE 
                                        WHEN mth_no IN ( '01', '02', '03' , '04', '05', '06' ) THEN 
                                        'Sem1 ' 
                                        
                                        ELSE 'Sem2 ' 
                                      END, yr_no) AS sem 
                        FROM   (SELECT ins.ins_id, 
                                       ins.f_id, 
                                       vo.v_code, 
                                       
                       To_char(To_date(ins.ins_activity_date), 'mm') AS 
                       mth_no, 
                       To_char(To_date(ins.ins_activity_date), 'yy') AS 
                       yr_no 
                                FROM   inspection ins 
                                       INNER JOIN (SELECT * 
                                                   FROM   violation 
                                                   WHERE  v_points > 3) vo 
                                               ON ins.ins_id = vo.ins_id)) 
        GROUP  BY f_id, 
                  sem, 
                  yr_no)
				  where f_id = :f_id)`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;