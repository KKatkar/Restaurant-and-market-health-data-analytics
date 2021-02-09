const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f_id = context.id;
 
    query = `SELECT Round(Avg(rank), 0) AS "rank", 
       Max(max_rank)       AS "total" 
FROM   (SELECT f_id, 
               
               rank, 
               Max(rank) 
                 OVER () AS max_rank 
        FROM   (SELECT f_id, 
                        
                        
                       Rank() 
                         OVER ( 
                            
                           ORDER BY v_score DESC) AS rank 
                FROM   (SELECT f_id, 
                                
                                
                               Avg(ins_score) AS v_score 
                        FROM   (SELECT ins_score, 
                                               ins_id, 
                                               f_id, 
                                               yr_no, 
                                               Concat(CASE 
                                                        WHEN mth_no IN ( '01', 
                                                             '02', 
                                                                         '03' ) 
                                                      THEN 'Q1 ' 
                                                        WHEN mth_no IN ( '04', 
                                                             '05', 
                                                                         '06' ) 
                                                      THEN 'Q2 ' 
                                                        WHEN mth_no IN ( '07', 
                                                             '08', 
                                                                         '09' ) 
                                                      THEN 'Q3 ' 
                                                        ELSE 'Q4 ' 
                                                      END, yr_no) AS qtr 
                                        FROM   (SELECT ins_score, 
                                                       ins_id, 
                                                       f_id, 
                                                       To_char(To_date( 
                                                       ins_activity_date), 'mm' 
                                                       ) AS 
                                                       mth_no, 
                                                       To_char(To_date( 
                                                       ins_activity_date), 'yy' 
                                                       ) AS 
                                                       yr_no 
                                                FROM   inspection vins)) 
                        GROUP  BY f_id
                                   
                                  ))) 
WHERE  f_id = :f_id  `;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;