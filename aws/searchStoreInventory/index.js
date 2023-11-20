
const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });
    
    let body = JSON.parse(event.body);
    let stores = body.stores;

    var response;
    var storeID;
    var storeQuery;
    var nameQuery;
    var storeInventory;
    var storeName;
    var allStores = {};
    

    for (let i = 0; i < stores.length; i++) {
        storeID = stores[i];

        nameQuery = `SELECT name FROM Stores WHERE storeID = ${storeID};`;

        storeName = await new Promise((resolve, reject) => {
            pool.query(nameQuery, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });

        storeQuery = `SELECT * FROM Computers WHERE storeID = ${storeID};`;

        storeInventory = await new Promise((resolve, reject) => {
            pool.query(storeQuery, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
        
        allStores[storeID] = storeInventory;
        allStores[storeID]["storeName"] = storeName[0].name;
    }
    
    response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(allStores),
    };

    pool.end();

    return response;
}

