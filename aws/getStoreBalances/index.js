/**
 * request inventory event
 */
const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

// credentials from db_access layer (loaded separately via console)
exports.handler = async (event) => {
  var pool = mysql.createPool({
      host: db_access.config.host,
      user: db_access.config.user,
      password: db_access.config.password,
      database: db_access.config.database
  });

  let storeNames = [];
  let balances = [];
  let response = {};
  

  //get the names 
  let balanceQuery ='SELECT name,storeBalance FROM Stores';

  let result = await new Promise((resolve, reject) => {
      pool.query(balanceQuery, [storeNames, balances], (err, res) => {
          if (err) {
              console.log(err);
              response = {
                  statusCode: 400,
                  body: JSON.stringify('Error: Database access error.'),
              };
              reject(response);
          } else {
            console.log(res);
            resolve(res); 
          }
      });
  });

  response = {
      statusCode: 200,
      headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*"
            },
      body: JSON.stringify(result),
  };

  return response;
};
