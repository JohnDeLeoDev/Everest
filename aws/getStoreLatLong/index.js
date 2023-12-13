/* getStoreCoordinates/index.js */

const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    let computerID = event.computerID;
    var response = {};

    //get the store id
    if (computerID === null || computerID === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: Computer not found.'),
        };
        return response;
    } else {
        let storeIDQuery = "SELECT storeID FROM Computers WHERE inventoryID = '" + computerID + "';";
        var result = await new Promise((resolve, reject) => {
            pool.query(storeIDQuery, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    let store = result[0].storeID;

    //get the lat/long from storeID
    if (store === null || store === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: Store ID is empty.'),
        };
        return response;
    } else {
        let computerQuery = "SELECT lat,longitude FROM Stores WHERE storeID = '" + store + "';";
        var latLong = await new Promise((resolve, reject) => {
            pool.query(computerQuery, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    let retLatLong = {
        lat: latLong[0],
        lon: latLong[1]
    }

    response = {
        statusCode: 200,
        body: JSON.stringify(retLatLong),
    };

    pool.end();

    return response;
}

            