const database = require('../services/database.js');
 
const baseQuery = 
 `
  `; //Not required inn this case
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.emp_id = context.id;
 
    query = `  
SELECT table1.YR_qtr as "qtr", table1.mode_vcode as "mode_own", table1.cnt_ins as "own_avg",  table2.v_cnt as "all_avg"
FROM 
(SELECT t3.YR_qtr, t4.mode_vcode, t3.cnt_ins 
FROM
(select YR_qtr, count(mode_vcode) as cnt_ins
FROM
(select t1.YR_qtr, t1.mode_vcode
from
(SELECT YR_qtr, STATS_MODE(v_code) as mode_vcode
FROM
(SELECT CONCAT(YR,QTR)as YR_qtr, v_code 
FROM (select CONCAT('Q',TO_CHAR(to_date(ins_activity_date), 'Q')) AS QTR, CONCAT(TO_CHAR(to_date(ins_activity_date), 'YY'),' ') AS YR, inspection.ins_id, violation.v_code as v_code
FROM inspection
inner join violation on violation.ins_id = inspection.ins_id
where emp_ID = :emp_id))
GROUP BY YR_qtr)t1,
(SELECT CONCAT(YR,QTR)as YR_qtr, v_code 
FROM (select CONCAT('Q',TO_CHAR(to_date(ins_activity_date), 'Q')) AS QTR, CONCAT(TO_CHAR(to_date(ins_activity_date), 'YY'),' ') AS YR, inspection.ins_id, violation.v_code as v_code
FROM inspection
inner join violation on violation.ins_id = inspection.ins_id
where emp_ID = :emp_id))t2
where t2.YR_qtr=t1.YR_qtr and t2.v_code= t1.mode_vcode)
GROUP BY YR_qtr)t3, (SELECT YR_qtr, STATS_MODE(v_code) as mode_vcode
FROM
(SELECT CONCAT(YR,QTR)as YR_qtr, v_code 
FROM (select CONCAT('Q',TO_CHAR(to_date(ins_activity_date), 'Q')) AS QTR, CONCAT(TO_CHAR(to_date(ins_activity_date), 'YY'),' ') AS YR, inspection.ins_id, violation.v_code as v_code
FROM inspection
inner join violation on violation.ins_id = inspection.ins_id
where emp_ID = :emp_id))
GROUP BY YR_qtr)t4 where t3.YR_qtr = t4.YR_qtr) table1 inner join 



(SELECT yr_qtr, v_code, round(avg(v_cnt),2) as v_cnt from (
SELECT CONCAT(YR,QTR)as YR_qtr,v_code,emp_id,count( v_code) as v_cnt  
FROM (select inspection.emp_id,CONCAT('Q',TO_CHAR(to_date(ins_activity_date), 'Q')) AS QTR, CONCAT(TO_CHAR(to_date(ins_activity_date), 'YY'),' ') AS YR, inspection.ins_id, violation.v_code as v_code
FROM inspection 
inner join violation on violation.ins_id = inspection.ins_id
where emp_ID <> :emp_id)
group by CONCAT(YR,QTR),v_code,emp_id)
group by yr_qtr,v_code)table2


on table2.YR_qtr = table1.YR_qtr and table2.v_code=table1.mode_vcode
order by table1.YR_qtr
`;
	
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;