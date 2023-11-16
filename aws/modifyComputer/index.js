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
    
    let inventoryID = event.inventoryID;
    let brand = event.brand;
    let model = event.model;
    let description = event.description;
    let price = event.price;
    let memory = event.memory;
    let storageSize = event.storageSize;
    let processor = event.processor;
    let processGen = event.processGen;
    let graphics = event.graphics;

    let compQuery = "UPDATE Computers SET brand = '" + brand + "', model = '" + model + "', description = '" + description + "', price = '" + price + "', memory = '" + memory + "', storageSize = '" + storageSize + "', processor = '" + processor + "', processGen = '" + processGen + "', graphics = '" + graphics + "' WHERE inventoryID = '" + inventoryID + "';";

    let compResult = await new Promise((resolve, reject) => {
        pool.query(compQuery, (error, results) => {
            if (error) {
                console.log(error);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });

    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: "Computer updated successfully."
    };
    
    pool.end();

    return response;
}

