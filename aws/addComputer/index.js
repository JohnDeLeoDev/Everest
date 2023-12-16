
// const mysql = require('mysql');

// // SET UP AN ASYNC EVENT HANDLER WHEN A REQUEST COMES IN...HANDLE IT. 
// exports.handler = async (event)=>{
    
    
//     // CONNECT TO THE DATABASE
//     var connection = mysql.createPool({
//         host: "everestdb.cvr2timum1d3.us-east-1.rds.amazonaws.com",
//         user: "admin",
//         password: "fLi;8E9k*s+=j-r",
//         database: "consignmentStore",
//     }); 
    
    
    
    
    
const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')


// SET UP AN ASYNC EVENT HANDLER WHEN A REQUEST COMES IN...HANDLE IT. 
exports.handler = async (event) => {
    
    // CONNECT TO THE DATABASE
    var connection = mysql.createPool({// credentials from db_access layer (loaded separately via console)
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });
    
    
    
    
    
    
    
    // INIT VARIBABLES WITH JSON DATA FROM THE JSON EVENT
    let json_brand = event.brand;
    let json_model = event.model;
    let json_price = event.price;
    let json_description = event.description;
    let json_memory = event.memory;
    let json_isSold = event.isSold;
    let json_processor = event.processor;
    let json_processGen = event.processGen;
    let json_storageSize = event.storageSize;
    let json_graphics = event.graphics;
    let json_storeID = event.storeID;
    let json_username = event.username;
    let json_password = event.password;
    
    // INIT VARS TO HOLD DATA RETURNED FROM THE DATABASE
    let db_password = "";
    let db_username = "";

    // VAR TO HOLD THE JSON RESPONSE FOR RETURNING...
    let response = {};
    
    
    
    
    console.log(json_username)
    console.log(json_brand)
    console.log(json_model)
    console.log(json_password)
    
    
// // CHECK USER/PASSWORD
//     // FIND THE USER IN THE DATABASE, PULL THEIR USERNAME AND PASSWORD FROM THE DATABASE
//     let userQuery = 'SELECT userID, password FROM consignmentStore.Users WHERE userID = (?)';
//     let userResult = await new Promise((resolve, reject)=> {
//         connection.query(userQuery, [json_username],(err, res)=> {
//             if(err) {
//                 console.log(err);
//                 response = {
//                     statusCode: 400,
//                     body: JSON.stringify('Error: User was not found'),
//                 };
//                 reject(response);
//             }else{
//                 console.log(res);
//                 resolve(res);
//             }
//         });
//     });
    
    
    
// IF PASSWORD PROVIDED BY USER MATCHES THAT IN THE DATABASE CONTINUE...
    //TODO

    
    
    
// ADD COMPUTER TO COMPUTERS TABLE USING JSON STRING DATA
    let insertQuery = 'INSERT INTO Computers (brand, model, price, description, memory, isSold, processor, processGen, storageSize, graphics, storeID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    let insertResult = await new Promise((resolve, reject)=> {
        connection.query(insertQuery, [json_brand, json_model, json_price, json_description, json_memory, json_isSold, json_processor, json_processGen, json_storageSize, json_graphics, json_storeID],(err, res)=> {
            if(err) {
                console.log(err);
                response = {
                    statusCode: 400,
                    body: JSON.stringify('Error: Computer could not be added'),
                };
                reject(response);
            }else{
                console.log(res);
                resolve(res);
            }
        });
    });



// RETEIEVE THE STORE ID OF THE NEWLY ADDED COMPUTER
    let storeQuery = 'SELECT storeID FROM consignmentStore.Computers WHERE inventoryID = (?)';
    
    let storeResult = await new Promise((resolve, reject)=> {
        connection.query(storeQuery, [insertResult.insertId],(err, res)=> {
            if(err) {
                console.log(err);
                response = {
                    statusCode: 400,
                    body: JSON.stringify('Error: storeID could not be found.'),
                };
                reject(response);
            }else{
                console.log(res);
                resolve(res);
            }
        });
    });
    
    // console.log("STORE RESULT BELOW");
    // console.log(storeResult);
    
    

    // CONSTRUCT THE RETURN STRING FROM THE FUNCTION RETURNS (RETURNS THE STOREID AND THE INVENTORY ID OF THE NEWLY ADDED COMPUTER)
    let constructed = ("{ storeID: " + storeResult[0].storeID + ", inventoryID: " + insertResult.insertId + "}"); 
    
    // // CONSTRUCT THE RETURN STRING FROM THE FUNCTION RETURNS (RETURNS THE USERIS, USER PASSWORD AND INVENTORY ID OF THE NEWLY ADDED COMPUTER)
    // let constructed = ("{ userID: " + userResult[0].userID + ", password: " + userResult[0].password + ", inventoryID: " + insertResult.insertId + "}"); 


    
    // SET UP THE JSON RESPONSE
    response = {
        statusCode: 200,
        header: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
        },
        body: constructed
    };
    
    connection.end();
    

    // RETURN THE RESPONSE
    return response;
    
};