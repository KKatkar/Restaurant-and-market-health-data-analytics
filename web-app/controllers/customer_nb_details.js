const nb_details = require('../db_apis/customer_nb_details.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = req.params.nb_id;
    console.log("Called For ID " + context.id);

    const rows = await nb_details.find(context);

	console.log("dumping data");
	console.log(rows);

  if (req.params.nb_id) {
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
