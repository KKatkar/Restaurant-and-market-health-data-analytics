const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f_id = context.id;
 
    query += `SELECT l.yr_no, 
       l.sem AS "sem", 
       CASE 
         WHEN r.avg_cnt IS NULL THEN 0 
         ELSE r.avg_cnt 
       END   AS "avg_cnt" 
FROM   (SELECT sem, 
               yr_no 
        FROM   (SELECT DISTINCT Concat(CASE 
                                         WHEN mth_no IN ( '01', '02', '03' ,'04', '05', '06' ) 
                                       THEN 'Sem1 ' 
                                         
                                         ELSE 'Sem2 ' 
                                       END, yr_no) AS sem, 
                                yr_no 
                FROM   (SELECT To_char(To_date(ins_activity_date), 'mm') AS 
                               mth_no, 
                               To_char(To_date(ins_activity_date), 'yy') AS 
                               yr_no 
                        FROM   inspection) 
                ORDER  BY yr_no DESC, 
                          sem DESC) 
        WHERE  rownum < 7)l 
       LEFT OUTER JOIN (SELECT sem, 
                               avg_cnt 
                        FROM   (SELECT f_id, 
                                       sem, 
                                       yr_no, 
                                       Round(Avg(v_cnt), 1) AS avg_cnt 
                                FROM   (SELECT f_id, 
                                               sem, 
                                               yr_no, 
                                               Count(v_code) AS v_cnt 
                                        FROM   (SELECT vins.ins_id, 
                                                       vins.f_id, 
                                                       vins.v_code, 
                                                       vins.sem, 
                                                       vins.yr_no 
                                                        
                                                FROM   (SELECT ins_id, 
                                                               f_id, 
                                                               v_code, 
                                                               yr_no, 
                                               Concat(CASE 
                                                        WHEN 
                                               mth_no IN ( '01', 
                                               '02', 
                                                           '03', 
                                                '04', 
                                               '05', 
                                                           '06' 
                                               ) 
                                                      THEN 'Sem1 ' 
                                                         
                                                        ELSE 'Sem2 ' 
                                                      END, yr_no) AS 
                                               sem 
                                                        FROM 
                                               (SELECT 
                                       ins.ins_id, 
                                       ins.f_id, 
                                       vo.v_code, 
                                       To_char( 
                                               To_date(ins.ins_activity_date), 'mm') AS 
                                                       mth_no, 
       To_char(To_date(ins.ins_activity_date), 'yy') AS 
       yr_no 
                FROM   inspection ins 
                       INNER JOIN violation vo 
                               ON ins.ins_id = 
                                  vo.ins_id
								  where ins.f_id = :f_id))vins ) 
       GROUP  BY f_id, 
       sem, 
       yr_no) 
       GROUP  BY sem, 
       yr_no, 
       f_id 
       ORDER  BY yr_no DESC, 
       sem DESC) 
       WHERE  rownum < 7 
       ORDER  BY yr_no ASC, 
       sem ASC)r 
                    ON l.sem = r.sem 
ORDER  BY l.yr_no ASC, 
          l.sem ASC`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;