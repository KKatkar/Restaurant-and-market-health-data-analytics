const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f_id = context.id;
 
    query = `select yr_no, "sem", case when "rank"=0 then upd_rank else "rank" end as "rank" from (
select yr_no, "sem", max("rank") over (order by yr_no,"sem" rows unbounded preceding ) as upd_rank,"rank" from (
SELECT l.yr_no, 
       l.sem AS "sem", 
       CASE 
         WHEN r.rank IS NULL THEN 0 
         ELSE r.rank 
       END   AS "rank" 
FROM   (SELECT sem, 
               yr_no 
        FROM   (SELECT DISTINCT Concat(CASE 
                                         WHEN mth_no IN ( '01', '02', '03', '04', '05', '06' )  
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
                               rank 
                        FROM   (SELECT f_id, 
                                       sem, 
                                       yr_no, 
                                       Rank() 
                                         OVER ( 
                                           partition BY sem 
                                           ORDER BY v_score DESC) AS rank 
                                FROM   (SELECT f_id, 
                                               sem, 
                                               yr_no, 
                                               Avg(ins_score) AS v_score 
                                        FROM   (SELECT ins_score, 
                                                               ins_id, 
                                                               f_id, 
                                                               yr_no, 
                                               Concat(CASE 
                                                        WHEN 
                                               mth_no IN ( '01', 
                                               '02', 
                                                           '03' ,
                                               
                                               '04', 
                                               '05', 
                                                           '06' 
                                               ) 
                                                      THEN 'Sem1 ' 
                                                       
                                                        ELSE 'Sem2 ' 
                                                      END, yr_no) AS 
                                               sem 
                                                        FROM   (SELECT ins_score 
                                                               , 
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
FROM   inspection vins) 
) 
GROUP  BY f_id, 
sem, 
yr_no)) 
WHERE  f_id = :f_id)r 
ON l.sem = r.sem 
ORDER  BY l.yr_no ASC, 
          l.sem ASC ))`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;