const risk_vs_score = require('../db_apis/risk_vs_score.js'); //Change
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = req.params.emp_id;
 
    const rows = await risk_vs_score.find(context);
 
    if (req.params.emp_id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]); // Copy in every new controller/fleName.js
      } 
	  else if(rows.length>1)
	  {
		 res.status(200).json(rows); 
	  }
	  else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;