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
    
    
    var response;

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

    let computer = {
        "inventoryID": inventoryID,
        "brand": brand,
        "model": model,
        "description": description,
        "price": price,
        "memory": memory,
        "storageSize": storageSize,
        "processor": processor,
        "processGen": processGen,
        "graphics": graphics
    }

    var errorMessages = [];
    var resultMessages = [];
    var response;

    
    let compQuery = "UPDATE Computers SET brand = '" + brand + "', model = '" + model + "', description = '" + description + "', price = '" + price + "', memory = '" + memory + "', storageSize = '" + storageSize + "', processor = '" + processor + "', processGen = '" + processGen + "', graphics = '" + graphics + "' WHERE inventoryID = '" + inventoryID + "';";

    let compResult = await new Promise((resolve, reject) => {
        pool.query(compQuery, (error, results) => {
            if (error) {
                errorMessages.push(error);
                resolve(false);
            } else {
                resultMessages.push(results);
                resolve(true);
            }
        });
    });
    
    if (compResult) {
        let compQuery2 = "SELECT * FROM Computers WHERE inventoryID = '" + inventoryID + "';";
        let compResult2 = await new Promise((resolve, reject) => {
            pool.query(compQuery2, (error, results) => {
                if (error) {
                    errorMessages.push(error);
                    resolve(error);
                } else {
                    resultMessages.push(results);
                    resolve(results);
                }
            });
        });
    
        response = {
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",    
            },
            "body": JSON.stringify(compResult2)
        };
    } else {
        response = {
            "isBase64Encoded": false,
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",    
            },
            "body": JSON.stringify(errorMessages)
        }
    }
    
    pool.end();

    return response;
}

