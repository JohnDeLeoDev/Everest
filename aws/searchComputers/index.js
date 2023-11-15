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
        filter = JSON.parse(event.body);
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
    let values = [];


    for (let i = 0; i < result.length; i++) {
        let comp = result[i];
        let add = false;
        for (let key in filter) {
            if (key === "price") {
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
            if (key === "memory") {
                for (let j = 0; j <  filter[key].length; j++) {
                    let value = comp.memory.match(/(\d+)/);
                    if (value !== null) {    

                        if (filter[key][j] == "4 GB or less") {
                            if (value[0] == "4") {
                                add = true;
                            }
                        } else if (filter[key][j] == "8 GB") {
                            if (value[0] == "8") {
                                add = true;
                            }
                        } else if (filter[key][j] == "16 GB") {
                            if (value[0] == "16") {
                                add = true;
                            }
                        } else if (filter[key][j] == "32 GB") {
                            if (value[0] == "32") {
                                add = true;
                            }
                        } 
                    }
     
                }
            }
            
            if (key === "storage") {
                for (let j = 0; j <  filter[key].length; j++) {
                    let value = comp.storageSize.match(/(\d+)/);
                    values.push(value);
                    if (filter[key][j] == "256 GB or less") {
                        if (value[0] == "256") {
                            add = true;
                        }
                    } else if (filter[key][j] == "512 GB") {
                        if (value[0] == "512") {
                            add = true;
                        }
                    } else if (filter[key][j] == "1 TB") {
                        if (value[0] == "1") {
                            add = true;
                        }
                    } else if (filter[key][j] == "2 TB") {
                        if (value[0] == "2") {
                            add = true;
                        }
                    }  
                }
            }

            if (key === "processor") {
                for (let j = 0; j <  filter[key].length; j++) {
                    if (filter[key][j] == "Intel Core i3") {
                        if (comp.processor == "Intel Core i3") {
                            add = true;
                        }
                    } else if (filter[key][j] == "Intel Core i5") {
                        if (comp.processor == "Intel Core i5") {
                            add = true;
                        }
                    } else if (filter[key][j] == "Intel Core i7") {
                        if (comp.processor == "Intel Core i7") {
                            add = true;
                        }
                    } else if (filter[key][j] == "Intel Core i9") {
                        if (comp.processor == "Intel Core i9") {
                            add = true;
                        }
                    } else if (filter[key][j] == "AMD Ryzen 3") {
                        if (comp.processor == "AMD Ryzen 3") {
                            add = true;
                        }
                    } else if (filter[key][j] == "AMD Ryzen 5") {
                        if (comp.processor == "AMD Ryzen 5") {
                            add = true;
                        }
                    } else if (filter[key][j] == "AMD Ryzen 7") {
                        if (comp.processor == "AMD Ryzen 7") {
                            add = true;
                        }
                    } else if (filter[key][j] == "AMD Ryzen 9") {
                        if (comp.processor == "AMD Ryzen 9") {
                            add = true
                        }
                    }
                }
            }

            if (key === "processGen") {
                for (let j = 0; j <  filter[key].length; j++) {
                    if (filter[key][j] == "9th Gen or older Intel") {
                        if (comp.processGen == "9th Gen or older Intel") {
                            add = true;
                        }
                    } else if (filter[key][j] == "10th Gen Intel") {
                        if (comp.processGen == "10th Gen Intel") {
                            add = true;
                        }
                    } else if (filter[key][j] == "11th Gen Intel") {
                        if (comp.processGen == "11th Gen Intel") {
                            add = true;
                        }
                    } else if (filter[key][j] == "12th Gen Intel") {
                        if (comp.processGen == "12th Gen Intel") {
                            add = true;
                        }
                    } else if (filter[key][j] == "13th Gen Intel") {
                        if (comp.processGen == "13th Gen Intel") {
                            add = true;
                        }
                    } else if (filter[key][j] == "AMD Ryzen 6000 Series") {
                        if (comp.processGen == "AMD Ryzen 6000 Series") {
                            add = true;
                        }
                    } else if (filter[key][j] == "AMD Ryzen 7000 Series") {
                        if (comp.processGen == "AMD Ryzen 7000 Series") {
                            add = true;
                        }
                    } else if (filter[key][j] == "AMD Ryzen 8000 Series") {
                        if (comp.processGen == "AMD Ryzen 8000 Series") {
                            add = true;
                        }
                    } else if (filter[key][j] == "AMD Ryzen 9000 Series") {
                        if (comp.processGen == "AMD Ryzen 9000 Series") {
                            add = true;
                        }
                    } 
                }
            }

            if (key === "graphics") {
                for (let j = 0; j <  filter[key].length; j++) {
                    if (filter[key][j] == "All Intel Graphics") {
                        if (comp.graphics == "Intel UHD Graphics") {
                            add = true;
                        }
                    } else if (filter[key][j] == "All AMD Graphics") {
                        if (comp.graphics == "AMD Radeon Graphics") {
                            add = true;
                        }
                    } else if (filter[key][j] == "All NVIDIA Graphics") {
                        if (comp.graphics == "NVIDIA GeForce Graphics") {
                            add = true;
                        }
                    } 
                }
            }
            
            if (add) {
                filtered.push(comp);
            }
            
        }
    }



    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(values)
    };

    return response;
}

