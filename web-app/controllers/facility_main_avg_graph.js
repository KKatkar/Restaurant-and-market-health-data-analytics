const facility_main_avg_graph = require('../db_apis/facility_main_avg_graph.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = req.params.f_id;
 
    const rows = await facility_main_avg_graph.find(context);
 
    if (req.params.f_id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
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