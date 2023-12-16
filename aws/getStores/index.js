const bcrypt = require('bcryptjs');

const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

const jwtSecret = db_access.config.jwtSecret;

// event.userID event.authorization

exports.handler = async (event) => {
    var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    var response = {};

    let storesQuery = "SELECT * FROM Stores;";

    var result = await new Promise((resolve, reject) => {
        pool.query(storesQuery, (err, res) => {
            if (err) {
                console.log(err);
                response = {
                    statusCode: 400,
                    body: JSON.stringify('Error: Stores do not exist.'),
                };
                reject(response);
            } else {
                if (res.length === 0) {
                    console.log("Stores do not exist.");
                    response = {
                        statusCode: 400,
                        body: JSON.stringify('Error: Stores do not exist.'),
                    };
                    reject(response);
                }
                resolve(res);
            }
        });
    });

    response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            },
        body: JSON.stringify(result)
    };

    pool.end();

    return response;
};


    