const oracledb = require('oracledb');

 

async function run() {

  let connection;

   let sql, binds, options, result;

  try {

connection = await oracledb.getConnection(

  {

    user          : "ntank",

    password      : "Leopan123", 

    connectString : "oracle.cise.ufl.edu:1521/orcl"

  }

);

 

sql = `SELECT name  FROM Country  JOIN Economy  ON Country.code = Economy.country WHERE agriculture > 50 `;

binds = {};

 

    // For a complete list of options see the documentation.

    options = {

      outFormat: oracledb.OUT_FORMAT_OBJECT   // query result format

      // extendedMetaData: true,   // get extra metadata

      // fetchArraySize: 100       // internal buffer allocation size for tuning

    };

result = await connection.execute(sql,binds,options);

console.log("Column metadata: ", result.metaData);

    console.log("Query results: ");

    console.log(result.rows);

               }

               catch (err) {

    console.error(err);

              

               if (connection) {

      try {

        await connection.close();

      } catch (err) {

        console.error(err);

      }

               }

               }

               }

              

                run();