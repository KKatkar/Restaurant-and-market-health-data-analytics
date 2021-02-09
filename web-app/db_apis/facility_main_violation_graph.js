const database = require('../services/database.js');
 
const baseQuery = 
 `
  `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.f_id = context.id;
 
    query = `SELECT comp.yr_no as "yr_no", 
       comp.sem as "sem", 
       comp."avg_cnt" AS "self_avg", 
       comp.own_avg   AS "all_comp_avg",
		self.self_avg as "all_self_avg"
FROM   (SELECT l.yr_no, 
               l.sem               AS sem, 
               CASE 
                 WHEN r.avg_cnt IS NULL THEN 0 
                 ELSE r.avg_cnt 
               END                 AS "avg_cnt", 
               Round(l.own_avg, 1) AS own_avg 
        FROM   (SELECT sem, 
                       yr_no, 
                       own_avg 
                FROM   (
				select sem, yr_no ,avg(own_avg) as own_avg from
				(SELECT Concat(CASE 
                                        WHEN mth_no IN ( '01', '02', '03', '04', '05', '06' ) THEN 
                                        'Sem1 ' 
                                        ELSE 'Sem2 ' 
                                      END, yr_no) AS sem, 
                               yr_no, 
							   f_id,
                               count(v_code)     AS own_avg 
                        FROM   (
						select ins.yr_no,ins.mth_no,vo.v_code,ins.f_id from
						(SELECT ins_id, f_id,
                                       To_char(To_date(ins_activity_date), 'mm') 
                                       AS 
                                       mth_no, 
                                       To_char(To_date(ins_activity_date), 'yy') 
                                       AS 
                                       yr_no 
                                FROM   inspection 
                                WHERE  f_id  IN (SELECT distinct f.f_id 
                                                    FROM   facility f inner join (select distinct o_id from facility where f_id!=:f_id) f2
													on f.o_id = f2.o_id
													
                                                    ))ins inner join violation vo on ins.ins_id = vo.ins_id)
                        GROUP  BY Concat(CASE 
                                           WHEN mth_no IN ( '01', '02', '03' , '04', '05', '06' ) 
                                         THEN 
                                           'Sem1 ' 
                                           
                                           ELSE 'Sem2 ' 
                                         END, yr_no), 
                                  yr_no 
								  , f_id
                        ORDER  BY yr_no DESC, 
                                  sem DESC) group by sem,yr_no )
                WHERE  rownum < 9)l 
               LEFT OUTER JOIN (SELECT sem, 
                                       avg_cnt 
                                FROM   (SELECT f_id, 
                                               sem, 
                                               yr_no, 
                                               Round(v_cnt, 1) AS avg_cnt 
                                        FROM   (SELECT f_id, 
                                                       sem, 
                                                       yr_no, 
                                                       Avg(v_code) AS v_cnt 
                                                FROM   (SELECT vins.ins_id, 
                                                               vins.f_id, 
                                                               vins.ins_score, 
                                                               vins.sem, 
                                                               vins.yr_no,
                                                               count(vins.v_code) as v_code
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
, '04', '05', 
'06' ) 
THEN 'Sem1 ' 
 
ELSE 'Sem2 ' 
END, yr_no) AS 
sem 
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
group by 
vins.ins_id, 
                                                               vins.f_id, 
                                                               vins.ins_score, 
                                                               vins.sem, 
                                                               vins.yr_no )
where f_id = :f_id 
GROUP  BY f_id, 
sem, 
yr_no) 
ORDER  BY yr_no DESC, 
sem DESC) 
ORDER  BY yr_no ASC, 
sem ASC)r 
ON l.sem = r.sem 
ORDER  BY l.yr_no ASC, 
l.sem ASC) comp
left outer join
(
SELECT sem, 
                       yr_no, 
                       round(self_avg,1) as self_avg 
                FROM   (
				select sem, yr_no, avg(self_avg) as self_avg from
				(SELECT Concat(CASE 
                                        WHEN mth_no IN ( '01', '02', '03', '04', '05', '06' ) THEN 
                                        'Sem1 ' 
                                        ELSE 'Sem2 ' 
                                      END, yr_no) AS sem, 
                               yr_no, 
							   f_id,
                               count(v_code)     AS self_avg 
                        FROM   (
						select ins.mth_no,ins.yr_no,vo.v_code,ins.f_id from
						(SELECT ins_score, f_id,ins_id,
                                       To_char(To_date(ins_activity_date), 'mm') 
                                       AS 
                                       mth_no, 
                                       To_char(To_date(ins_activity_date), 'yy') 
                                       AS 
                                       yr_no 
                                FROM   inspection 
                                WHERE  f_id IN (SELECT distinct f.f_id 
                                                    FROM   facility f inner join (select distinct o_id from facility where f_id=:f_id) f2
													on f.o_id = f2.o_id
													
                                                    ) and f_id!=:f_id)ins inner join violation vo on ins.ins_id = vo.ins_id )
                        GROUP  BY Concat(CASE 
                                           WHEN mth_no IN ( '01', '02', '03' , '04', '05', '06' ) 
                                         THEN 
                                           'Sem1 ' 
                                           
                                           ELSE 'Sem2 ' 
                                         END, yr_no), 
                                  yr_no , f_id
                        ORDER  BY yr_no DESC, 
                                  sem DESC) group by sem, yr_no )
                WHERE  rownum < 9
)
self
on comp.sem =self.sem
order by comp.yr_no, comp.sem`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;