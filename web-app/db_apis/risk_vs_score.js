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
Select table1.YR_qtr as "qtr", table1.E_score as "own_avg", table2.notE_score as "all_avg"
From
(SELECT YR_qtr, round(avg(ins_score),2) as E_score
FROM
(SELECT CONCAT(YR,QTR)as YR_qtr, ins_score
FROM
(SELECT CONCAT('Q',TO_CHAR(To_date(ins_activity_date), 'Q')) AS QTR, ins_score, CONCAT(TO_CHAR(To_date(ins_activity_date), 'YY'),' ') AS YR
FROM inspection
where emp_ID = :emp_id))
GROUP by YR_qtr)table1
inner join 
(SELECT YR_qtr, round(avg(ins_score),2) as notE_score
FROM
(SELECT CONCAT(YR,QTR)as YR_qtr, ins_score
FROM
(SELECT CONCAT('Q',TO_CHAR(To_date(ins_activity_date), 'Q')) AS QTR, ins_score, CONCAT(TO_CHAR(To_date(ins_activity_date), 'YY'),' ') AS YR
FROM inspection
where emp_ID <> :emp_id))
GROUP by YR_qtr)table2 on table2.YR_qtr = table1.YR_qtr
order by table1.YR_qtr
`;
	
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;