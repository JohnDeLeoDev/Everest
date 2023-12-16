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

    let computer = JSON.parse(event.inventoryID);
    
    var compQuery = "DELETE FROM Computers WHERE inventoryID = " + computer + ";";

    let compResult = await new Promise((resolve, reject) => {
        pool.query(compQuery, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
    

    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: "Computer removed successfully."
    };

    return response;
}

