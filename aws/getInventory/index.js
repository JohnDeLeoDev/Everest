
const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    let user = event.userID;
    var response = {};

    if (user === null || user === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: User ID is empty.'),
        };
        return response;
    } else {
        let storeQuery = "SELECT storeID FROM Stores WHERE storeOwner = '" + user + "';";
        var result = await new Promise((resolve, reject) => {
            pool.query(storeQuery, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    let store = result[0].storeID;

    if (store === null || store === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: Store ID is empty.'),
        };
        return response;
    } else {
        let computerQuery = "SELECT * FROM Computers WHERE storeID = '" + store + "';";
        var result2 = await new Promise((resolve, reject) => {
            pool.query(computerQuery, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    let inventory = {}

    for (let i = 0; i < result2.length; i++) {
        inventory[result2[i].inventoryID] = result2[i];
    }

    response = {
        statusCode: 200,
        body: JSON.stringify(inventory),
    };

    pool.end();

    return response;
}

            