const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
    var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });
    
    
    
    let storeID = event.storeID;
    let storeName = event.name;
    
    // let parsedName = storeName.replaceAll('\"',"");
    // storeName = parsedName;
    
    // console.log(storeName)

    let response = {};
    
    
    //delete store by ID
    if(storeID){
        
    console.log("inside storeID remove");
    // REMOVE A STORE FROM THE DATABASE BY ID
        let removeQuery = 'DELETE FROM consignmentStore.Stores WHERE storeID=(?)';
        
    // REMOVE A STORE FROM THE DATABASE BY NAME
        // let removeQuery = 'DELETE FROM consignmentStore.Stores WHERE name = (?)';
        
        let removeResult = await new Promise((resolve, reject)=> {
            pool.query(removeQuery, [storeID], (err, res)=> {
            // pool.query(removeQuery, [storeName], (err, res)=> {
                if(err) {
                    console.log(err);
                    response = {
                        statusCode: 400,
                        body: JSON.stringify('Error: storeID could not be found. Store not removed.'),
                    };
                    reject(response);
                }else{
                    console.log(res);
                    resolve(res);
                }
            });
        });
    } else {        //delete by name
       
        console.log("Inside name remove");
    // REMOVE A STORE FROM THE DATABASE BY ID
        // let removeQuery = 'DELETE FROM consignmentStore.Stores WHERE storeID = (?)';
        
    // REMOVE A STORE FROM THE DATABASE BY NAME
        let removeQuery = "DELETE FROM Stores WHERE name like (?)";
        
        var removeResult = await new Promise((resolve, reject)=> {
            // pool.query(removeQuery, [storeID], (err, res)=> {
            pool.query(removeQuery, [storeName], (err, res)=> {
                if(err) {
                    console.log(err);
                    response = {
                        statusCode: 400,
                        body: JSON.stringify('Error: storeName could not be found. Store not removed.'),
                    };
                    reject(response);
                }else{
                    console.log(res);
                    resolve(res);
                }
            });
        });
    }

    
    // SET UP THE JSON RESPONSE
    response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            },
        body: JSON.stringify(removeResult)
        
        // body: constructed
    };

    // RETURN THE RESPONSE
    return response;
    
};