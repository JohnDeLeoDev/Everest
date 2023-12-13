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

    //shipping money should go to outer space, no ups
    let computerID = event.computerID;      //get the storeID to pay the store, then rem computer at the end
    let storeCut = event.storeCut;      //pay the store 95%
    let siteCut = event.siteCut;        //pay the site the rest


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

    //pay the store
    if (store === null || store === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: Store ID is empty.'),
        };
        return response;            
    } else if (storeCut === null || storeCut === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: Invalid transaction. The store must be paid.'),
        };
        return response;
    } else {            //Update Stores SET storeBalance = storeBalance + 3.00 where storeID=3;
        let computerQuery = "UPDATE Stores SET storeBalance = storeBalance +'" + storeCut + "' WHERE storeID = '" + store + "';";
        var latLong = await new Promise((resolve, reject) => {
            pool.query(computerQuery, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    //pay the site manager
    if (siteCut === null || siteCut === undefined) {
        response = {
            statusCode: 400,
            body: JSON.stringify('Error: Invalid transaction. The Site requires a cut.'),
        };
        return response;
    } else {        //Update Site_Balances SET balanceAmount = balanceAmount + 3.00 where balanceName="Profit";
        let storeIDQuery = 'UPDATE Site_Balances SET balanceAmount = balanceAmount + ' + siteCut + ' WHERE balanceName = "Profit";';
        var result = await new Promise((resolve, reject) => {
            pool.query(storeIDQuery, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    //remove the computer
    let storeIDQuery = 'DELETE FROM Computers WHERE inventoryID=' + computerID + ';';
    var result = await new Promise((resolve, reject) => {
        pool.query(storeIDQuery, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });

    //back to app
    response = {
        statusCode: 200,
        body: JSON.stringify("Success! Computer Purchased."),
    };

    pool.end();

    return response;
}

            