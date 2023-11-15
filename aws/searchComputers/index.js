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
    
    var filter = {};
    
    if (event.body !== null || event.body !== undefined) {
        filter = event.body;
    }  
    
    
    var compQuery = "SELECT * FROM Computers";

    var result = await new Promise((resolve, reject) => {
        pool.query(compQuery, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });

    let filtered = [];
    let keys = [];


    for (let i = 0; i < result.length; i++) {
        let comp = result[i];
        let add = false;
        for (let key in filter) {
            keys.push(key);
            if (key.toLowerCase === "price") {
                for (let j = 0; j <  filter[key].length; j++) {
                    if (filter[key][j] == "$500 or less") {
                        if (comp.price <= 500) {
                            add = true;
                        }
                    } else if (filter[key][j] == "$501-$1000") {
                        if (comp.price >= 501 && comp.price <= 1000) {
                            add = true;
                        }
                    } else if (filter[key][j] == "$1001-$1500") {
                        if (comp.price >= 1001 && comp.price <= 1500) {
                            add = true;
                        }
                    } else if (filter[key][j] == "$1501-$2000") {
                        if (comp.price >= 1501 && comp.price <= 2000) {
                            add = true;
                        }
                    } else if (filter[key][j] == "$2001 or more") {
                        if (comp.price >= 2001) {
                            add = true;
                        }
                    }
                }
            }  
        }
        if (add) {
            filtered.push(comp);
        }
    }



    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(keys)
    };

    return response;
}

