/* getOneStoreBalance/index.js */

const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    let user = event.storeOwner;
    var response = {};

    //get the lat/long from storeID
    if (user === null || user === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: Store user is empty.'),
        };
        return response;
    } else {
        let computerQuery = "SELECT storeBalance FROM Stores WHERE storeOwner = '" + user + "';";
        var balance = await new Promise((resolve, reject) => {
            pool.query(computerQuery, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    

    response = {
        statusCode: 200,
        body: JSON.stringify(balance),
    };

    pool.end();

    return response;
}

            