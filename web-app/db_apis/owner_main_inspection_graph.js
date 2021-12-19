const database = require('../services/database.js');
 
const baseQuery = 
 `
select f_name as "f_name" from facility  

`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
	
    binds.o_id = context.id;
	
    query = `
SELECT yr_no, 
       "qtr", 
       "avg_cnt" AS "own_avg", 
       own_avg   AS "all_avg" 
FROM   (SELECT l.yr_no, 
               l.qtr               AS "qtr", 
               CASE 
                 WHEN r.avg_cnt IS NULL THEN 0 
                 ELSE r.avg_cnt 
               END                 AS "avg_cnt", 
               Round(l.own_avg, 1) AS own_avg 
        FROM   (SELECT qtr,yr_no,own_avg from (SELECT qtr, 
                       yr_no, 
                       avg(own_avg) as own_avg 
                FROM   (SELECT f_id,Concat(CASE 
                                        WHEN mth_no IN ( '01', '02', '03' ) THEN 
                                        'Q1 ' 
                                        WHEN mth_no IN ( '04', '05', '06' ) THEN 
                                        'Q2 ' 
                                        WHEN mth_no IN ( '07', '08', '09' ) THEN 
                                        'Q3 ' 
                                        ELSE 'Q4 ' 
                                      END, yr_no) AS qtr, 
                               yr_no, 
                               count(v_code)     AS own_avg 
                        FROM   (SELECT ins_score,v_code,f_id,
                                       To_char(To_date(ins_activity_date), 'mm') 
                                       AS 
                                       mth_no, 
                                       To_char(To_date(ins_activity_date), 'yy') 
                                       AS 
                                       yr_no 
                                FROM   (select ins.ins_score,vo.v_code,ins.f_id,ins.ins_activity_date,f.o_id from inspection ins 
INNER JOIN violation vo 
ON ins.ins_id = 
vo.ins_id
inner join (SELECT f_id ,o_id
                                                    FROM   facility 
                                                    WHERE  o_id != :o_id) f
on ins.f_id = f.f_id
)
                        ) 
                        GROUP  BY Concat(CASE 
                                           WHEN mth_no IN ( '01', '02', '03' ) 
                                         THEN 
                                           'Q1 ' 
                                           WHEN mth_no IN ( '04', '05', '06' ) 
                                         THEN 
                                           'Q2 ' 
                                           WHEN mth_no IN ( '07', '08', '09' ) 
                                         THEN 
                                           'Q3 ' 
                                           ELSE 'Q4 ' 
                                         END, yr_no), 
                                  yr_no ,f_id
                       ) group by qtr,yr_no  ORDER  BY yr_no DESC, 
                                  qtr DESC) 
                WHERE  rownum < 9)l 
               LEFT OUTER JOIN (SELECT qtr, 
                                       avg_cnt 
                                FROM   (SELECT 
                                               qtr, 
                                               yr_no, 
                                               Round(avg(v_cnt), 1) AS avg_cnt 
                                        FROM   (SELECT f_id, 
                                                       qtr, 
                                                       yr_no, 
                                                       count(v_code) AS v_cnt 
                                                FROM   (SELECT vins.ins_id, 
                                                               vins.f_id, 
                                                               vins.ins_score, 
                                                               vins.qtr, 
                                                               vins.yr_no, 
                                                               vins.v_code,
                                                               f.o_id 
                                                        FROM   (SELECT ins_score 
                                                               , 
ins_id, 
v_code,
f_id, 
yr_no, 
Concat(CASE 
WHEN 
mth_no IN ( '01' 
, '02', 
'03' 
) 
THEN 'Q1 ' 
WHEN 
mth_no IN ( '04', '05', 
'06' ) 
THEN 'Q2 ' 
WHEN 
mth_no IN ( '07', '08', 
'09' ) 
THEN 'Q3 ' 
ELSE 'Q4 ' 
END, yr_no) AS 
qtr 
FROM 
(SELECT 
ins.ins_id, 
ins.f_id, 
ins.ins_score,
vo.v_code,
To_char( 
To_date(ins.ins_activity_date), 'mm') AS 
mth_no, 
To_char(To_date(ins.ins_activity_date), 'yy') AS 
yr_no 
FROM   inspection ins 
INNER JOIN violation vo 
ON ins.ins_id = 
vo.ins_id))vins 
INNER JOIN (SELECT * 
FROM   facility 
WHERE  o_id = :o_id)f 
ON vins.f_id = f.f_id) 
GROUP  BY f_id, 
qtr, 
yr_no) 
group by yr_no,qtr
ORDER  BY yr_no DESC, 
qtr DESC) 
ORDER  BY yr_no ASC, 
qtr ASC)r 
ON l.qtr = r.qtr 
ORDER  BY l.yr_no ASC, 
l.qtr ASC) 


 `;


  }
 
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}
 
module.exports.find = find;