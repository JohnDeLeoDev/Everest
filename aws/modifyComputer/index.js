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

    let body = event.body;

    body = JSON.parse(body);

    let inventoryID = body.inventoryID;
    let brand = body.brand;
    let model = body.model;
    let description = body.description;
    let price = body.price;
    let memory = body.memory;
    let storageSize = body.storageSize;
    let processor = body.processor;
    let processGen = body.processGen;
    let graphics = body.graphics;

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

        response = 
        {
            "isBase64Encoded": false,
            "statusCode": 200,
            "body": JSON.stringify(compResult2),
            "headers": {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        
    } else {
        response = 
        {
            "isBase64Encoded": false,
            "statusCode": 200,
            "body": JSON.stringify(errorMessages),
            "headers": {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        
    }
    
    pool.end();

    return response;
}

