const top_restaurant_table = require('../db_apis/customer_top_restaurant_tbl.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = req.params.o_id;
 
    const rows = await top_restaurant_table.find(context);
	
	console.log("dumping data");
	console.log(rows);
 
    
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
    
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;