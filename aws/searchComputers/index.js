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

    var filter;
    
    if (event.body !== null && event.body !== undefined && event.body !== "{}") {
        filter = JSON.parse(event.body);
    } else {
        filter = {};
    }
    
    let filtered = [];

    function priceTest(comp) {
        if (filter["price"] !== undefined) {
            for (let i = 0; i < filter["price"].length; i++) {
                if (filter["price"][i] == "$500 or less") {
                    if (comp.price <= 500) {
                        return true;
                    } 
                }
                if (filter["price"][i] == "$501-$1000") {
                    if (comp.price >= 501 && comp.price <= 1000) {
                        return true;
                    }
                }
                if (filter["price"][i] == "$1001-$1500") {
                    if (comp.price >= 1001 && comp.price <= 1500) {
                        return true;
                    } 
                }
                if (filter["price"][i] == "$1501-$2000") {
                    if (comp.price >= 1501 && comp.price <= 2000) {
                        return true;
                    }
                }
                if (filter["price"][i] == "$2001 or more") {
                    if (comp.price >= 2001) {
                        return true;
                    } 
                }
            }
            return false;
        } else {
            return true;
        }
    }

    function memoryTest(comp) {
        if (filter["memory"] !== undefined) {
            for (let i = 0; i < filter["memory"].length; i++) {
                if (filter["memory"][i] == "4 GB or less") {
                    let value = comp.memory.match(/(\d+)/);
                    if (value !== null) {
                        if (value[0] == "4") {
                            return true;
                        } 
                    }
                }
                if (filter["memory"][i] == "8 GB") {
                    let value = comp.memory.match(/(\d+)/);
                    if (value !== null) {
                        if (value[0] == "8") {
                            return true;
                        } 
                    }
                }
                if (filter["memory"][i] == "16 GB") {
                    let value = comp.memory.match(/(\d+)/);
                    if (value !== null) {
                        if (value[0] == "16") {
                            return true;
                        } 
                    }
                }
                if (filter["memory"][i] == "32 GB") {
                    let value = comp.memory.match(/(\d+)/);
                    if (value !== null) {
                        if (value[0] == "32") {
                            return true;
                        }
                    }
                }
            }
            return false;
        } else {
            return true;
        }
    }

    function storageTest(comp) {
        if (filter.storage !== undefined) {
            for (let i = 0; i < filter.storage.length; i++) {
                let value = comp.storageSize.match(/(\d+)/);
                if (value !== null) {
                    if (filter.storage[i] == "256 GB or less") {
                        if (value[0] == "256") {
                            return true;
                        } 
                    } else if (filter.storage[i] == "512 GB") {
                        if (value[0] == "512") {
                            return true;
                        } 
                    } else if (filter.storage[i] == "1 TB") {
                        if (value[0] == "1") {
                            return true;
                        } 
                    } else if (filter.storage[i] == "2 TB") {
                        if (value[0] == "2") {
                            return true;
                        } 
                    }
                }
            }
            return false;
        } else {
            return true;
        }
    }

    function processorTest(comp) {
        if (filter.processor !== undefined) {
            for (let i = 0; i < filter.processor.length; i++) {
                if (filter.processor[i] == "Intel Core i3") {
                    if (comp.processor == "Intel Core i3") {
                        return true;
                    } 
                } else if (filter.processor[i] == "Intel Core i5") {
                    if (comp.processor == "Intel Core i5") {
                        return true;
                    } 
                } else if (filter.processor[i] == "Intel Core i7") {
                    if (comp.processor == "Intel Core i7") {
                        return true;
                    } 
                } else if (filter.processor[i] == "Intel Core i9") {
                    if (comp.processor == "Intel Core i9") {
                        return true;
                    } 
                } else if (filter.processor[i] == "AMD Ryzen 3") {
                    if (comp.processor == "AMD Ryzen 3") {
                        return true;
                    } 
                } else if (filter.processor[i] == "AMD Ryzen 5") {
                    if (comp.processor == "AMD Ryzen 5") {
                        return true;
                    } 
                } else if (filter.processor[i] == "AMD Ryzen 7") {
                    if (comp.processor == "AMD Ryzen 7") {
                        return true;
                    } 
                } else if (filter.processor[i] == "AMD Ryzen 9") {
                    if (comp.processor == "AMD Ryzen 9") {
                        return true
                    } 
                }
            }
            return false;
        } else {
            return true;
        }
    }

    function processGenTest(comp) {
        if (filter.processGen !== undefined) {
            for (let i = 0; i < filter.processGen.length; i++) {
                if (filter.processGen[i] == "7th Gen or older") {
                    if (comp.processGen == "7th Gen or older") {
                        return true;
                    } 
                } else if (filter.processGen[i] == "8th Gen") {
                    if (comp.processGen == "8th Gen") {
                        return true;
                    } 
                } else if (filter.processGen[i] == "9th Gen") {
                    if (comp.processGen == "9th Gen") {
                        return true;
                    } 
                } else if (filter.processGen[i] == "10th Gen") {
                    if (comp.processGen == "10th Gen") {
                        return true;
                    } 
                } else if (filter.processGen[i] == "11th Gen") {
                    if (comp.processGen == "11th Gen") {
                        return true;
                    } 
                }
            }
            return false;
        } else {
            return true;
        }
    }

    function graphicsTest(comp) {
        if (filter.graphics !== undefined) {
            for (let i = 0; i < filter.graphics.length; i++) {
                if (filter.graphics[i] == "Intel UHD Graphics") {
                    if (comp.graphics == "Intel UHD Graphics") {
                        return true;
                    } 
                } else if (filter.graphics[i] == "Intel Iris Xe Graphics") {
                    if (comp.graphics == "Intel Iris Xe Graphics") {
                        return true;
                    } 
                } else if (filter.graphics[i] == "NVIDIA GeForce GTX 1650") {
                    if (comp.graphics == "NVIDIA GeForce GTX 1650") {
                        return true;
                    } 
                } else if (filter.graphics[i] == "NVIDIA GeForce GTX 1660 Ti") {
                    if (comp.graphics == "NVIDIA GeForce GTX 1660 Ti") {
                        return true;
                    } 
                } else if (filter.graphics[i] == "NVIDIA GeForce RTX 2060") {
                    if (comp.graphics == "NVIDIA GeForce RTX 2060") {
                        return true;
                    } 
                } else if (filter.graphics[i] == "NVIDIA GeForce RTX 2070") {
                    if (comp.graphics == "NVIDIA GeForce RTX 2070") {
                        return true;
                    } 
                } else if (filter.graphics[i] == "NVIDIA GeForce RTX 2080") {
                    if (comp.graphics == "NVIDIA GeForce RTX 2080") {
                        return true;
                    } 
                } else if (filter.graphics[i] == "NVIDIA GeForce RTX 3060") {
                    if (comp.graphics == "NVIDIA GeForce RTX 3060") {
                        return true;
                    } 
                } else if (filter.graphics[i] == "NVIDIA GeForce RTX 3070") {
                    if (comp.graphics == "NVIDIA GeForce RTX 3070") {
                        return true;
                    } 
                }
            }
            return false;
        } else {
            return true;
        }
    } 


    for (let i = 0; i < result.length; i++) {
        let comp = result[i];
        let priceTestResult = priceTest(comp);
        let memoryTestResult = memoryTest(comp);
        let storageTestResult = storageTest(comp);
        let processorTestResult = processorTest(comp);
        let processGenTestResult = processGenTest(comp);
        let graphicsTestResult = graphicsTest(comp);

        if (priceTestResult && memoryTestResult && storageTestResult && processorTestResult && processGenTestResult && graphicsTestResult) {
            filtered.push(comp)
        }     
    }



    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(filtered)
    };

    return response;
}

