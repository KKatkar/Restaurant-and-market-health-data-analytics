const ins_total_graph = require('../db_apis/ins_total_graph.js'); //Change
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = req.params.emp_id;
 
    const rows = await ins_total_graph.find(context);
 
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