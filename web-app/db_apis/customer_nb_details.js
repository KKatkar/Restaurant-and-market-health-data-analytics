const database = require('../services/database.js');

const baseQuery =
 `


  `;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.nb_id = context.id;

    query = `
Select f_name from facility f, address a
where f.address_id = a.address_id and
f.address_id = :nb_id `;


  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
