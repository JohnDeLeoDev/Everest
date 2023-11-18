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


    let amount = event["amount"];

    let siteQuery = "UPDATE Site_Balances SET balanceAmount = balanceAmount + ? WHERE (balanceName = 'Profit');";

    let siteResult = await new Promise((resolve, reject) => {
        pool.query(siteQuery, [amount], function (error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });

    let siteQuery2 = "SELECT * FROM Site_Balances";

    let siteResult2 = await new Promise((resolve, reject) => {
        pool.query(siteQuery2, function (error, results, fields) {
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
        body: JSON.stringify(siteResult2)
    };

    return response;
}

