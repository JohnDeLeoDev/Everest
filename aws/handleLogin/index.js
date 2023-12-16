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

    let user = event.userID;
    let password = event.password;
    let isMatch = false;
    var response = {};
    let responseBody = {};

    if (user === null || user === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: User ID is empty.'),
        };
        return response;
    } else if (password === null || password === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: Password is empty.'),
        };
        return response;
    } else {
        // find user in database with userID, check password
        let userQuery = "SELECT * FROM Users WHERE userID = '" + user + "';";
        var result = await new Promise((resolve, reject) => {
            pool.query(userQuery, (err, res) => {
                if (err) {
                    console.log(err);
                    response = {
                        statusCode: 400,
                        body: JSON.stringify('Error: User does not exist.'),
                    };
                    reject(response);
                } else {
                    if (res.length === 0) {
                        console.log("User does not exist.");
                        response = {
                            statusCode: 400,
                            body: JSON.stringify('Error: User does not exist.'),
                        };
                        reject(response);
                    }
                    resolve(res);
                }
            });
        });
    }
    console.log(result);

    let userDB = result[0];
    let passwordDB = userDB.password;
    let userType = userDB.userType;

    if (password === passwordDB) {
        isMatch = true;
        responseBody = "User authenticated."
        console.log("User authenticated.");
    } else {
        responseBody = "Incorrect password.";
        console.log("Incorrect password.");
    }

    let storeQuery = "SELECT * FROM Stores WHERE storeOwner = '" + user + "';";

    var result2 = await new Promise((resolve, reject) => {
        pool.query(storeQuery, (err, res) => {
            if (err) {
                console.log(err);
                response = {
                    stores: 'User does not have a store.',
                };
            } else {
                if (res.length === 0) {
                    console.log("User does not have a store.");
                    response = {
                        stores: 'User does not have a store.',
                    };
                    
                }
                resolve(res);
            }
        });
    });

    let storeDB = result2[0];



    let constructed = ("{ userID: " + user + ", result: " + responseBody +  "}"); 

    response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            },
        body: {
            "user": user,
            "userType": userType,
            "stores": storeDB,
            "response": constructed
        }
    };
    pool.end();
    return response;
  };