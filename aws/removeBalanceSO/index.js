const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

// event.userID event.authorization

exports.handler = async (event) => {
    var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    /* Takes JSON body with:
     * userID
     * amount
     */

   

    let storeOwner = event["userID"];
    let amount = event["amount"];

    let storeQuery = "UPDATE Stores SET storeBalance = storeBalance - ? WHERE storeOwner = ?";

    let storeResult = await new Promise((resolve, reject) => {
        pool.query(storeQuery, [amount, storeOwner], function (error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });

    let storeQuery2 = "SELECT storeBalance FROM Stores WHERE storeOwner = ?";

    let storeResult2 = await new Promise((resolve, reject) => {
        pool.query(storeQuery2, [storeOwner], function (error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });

    pool.end();

    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(storeResult2)
    };

    return response;
}

