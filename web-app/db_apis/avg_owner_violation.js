const database = require('../services/database.js');
 
const baseQuery = 
 `
SELECT Round(Avg(v_cnt), 1) AS "avg_cnt" 
FROM   (SELECT o_id, 
               qtr, 
               yr_no, 
               Count(v_code) AS v_cnt 
        FROM   (SELECT vins.ins_id, 
                       vins.f_id, 
                       vins.v_code, 
                       vins.qtr, 
                       vins.yr_no, 
                       f.o_id 
                FROM   (SELECT ins_id, 
                               f_id, 
                               v_code, 
                               yr_no, 
                               Concat(CASE 
                                        WHEN mth_no IN ( '01', '02', '03' ) THEN 
                                        'Q1 ' 
                                        WHEN mth_no IN ( '04', '05', '06' ) THEN 
                                        'Q2 ' 
                                        WHEN mth_no IN ( '07', '08', '09' ) THEN 
                                        'Q3 ' 
                                        ELSE 'Q4 ' 
                                      END, yr_no) AS qtr 
                        FROM   (SELECT ins.ins_id, 
                                       ins.f_id, 
                                       vo.v_code, 
                       To_char(To_date(ins.ins_activity_date), 'mm') AS 
                       mth_no, 
                       To_char(To_date(ins.ins_activity_date), 'yy') AS 
                       yr_no 
                                FROM   inspection ins 
                                       INNER JOIN violation vo 
                                               ON ins.ins_id = vo.ins_id))vins 
                       INNER JOIN facility f 
                               ON vins.f_id = f.f_id) 
        GROUP  BY o_id, 
                  qtr, 
                  yr_no) 


  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.o_id = context.id;
 
    query += `\nwhere	 o_id = :o_id`;
	console.log(query);
  }
 
  const result = await database.simpleExecute(query, binds);
	console.log(result);
  return result.rows;
}
 
module.exports.find = find;