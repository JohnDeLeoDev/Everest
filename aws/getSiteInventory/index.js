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

  
  //let arg1 = event.arg1;
  let storeNames = [];
  //let nameKeys = [];
  let prices = [];
  //let inventoryBalances = []
  //let description = event.description;
  let response = {};
  

  //get the names 
  let inventoryQuery ='SELECT name,price \
                       FROM Stores  \
                       JOIN Computers\
                       ON Stores.storeID=Computers.storeID';

  let result = await new Promise((resolve, reject) => {

      pool.query(inventoryQuery, [storeNames, prices], (err, res) => {
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

/*
headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            },

*/

/**
 * 
 * UC2. Generate Store Inventory Report by $$

Payload:
{
    "reportType":"storeInventory",
    “sortType”: “ascend”
    “userName”: “siteAdmin”,
    “userPass” : “xxxxxx”

}

Response:
{
    “statusCode”: 200,
    storeInventories: [
{"storeID": "848932",  ”storeName”: “AnotherStore”,"storeInventory": "0000300"},
{"storeID": "848927", ”storeName”: “SuperFake Computer Store”,  "storeInventory": "1000000"},
{"storeID": "848928", ”storeName”: “Commodore Store”, "storeInventory": "1038489"},
{"storeID": "848929", ”storeName”: “Compaq Store”, "storeInventory": "1058939"},
{"storeID": "848930", ”storeName”: “Gateway Store”, "storeInventory": "1293494"},
{"storeID": "848931", ”storeName”: “Other Store”, "storeInventory": "2987499"}

}

 */