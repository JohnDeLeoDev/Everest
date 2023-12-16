
const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    var response = {};

    let storeQuery = "SELECT balanceAmount FROM Site_Balances WHERE balanceName = 'Profit';";
    
    var result = await new Promise((resolve, reject) => {
        pool.query(storeQuery, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });

    response = {
        statusCode: 200,
        body: JSON.stringify(result[0]),
    };

    pool.end();

    return response;
}

            