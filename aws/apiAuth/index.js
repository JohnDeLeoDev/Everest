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


   
    let token = event.authorization;
    let user = token.split(" ")[0];
    token = token.split(" ")[1];
    
    let isMatch = false;

    if (token === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify('Error: No token provided.'),
        };
    } else {  
        // find user in database with userID, check password
        let userQuery = "SELECT password FROM Users WHERE userID = '" + user + "';";

        let result = await new Promise((resolve, reject) => {
            pool.query(userQuery, (err, res) => {
                if (err) {
                    console.log(err);
                    response = {
                        statusCode: 400,
                        body: JSON.stringify('Error: User does not exist.'),
                    };
                    reject(response);
                } else {
                    console.log(res);
                    resolve(res);
                }
            });
        });

        let userDB = result[0];
        let password = userDB.password;


        if (token === password) {
            isMatch = true;
            console.log("User authenticated.");
        } else {
            console.log("User not authenticated.");
        }
    }

    const policyDocument = {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: isMatch ? 'Allow' : 'Deny',
            Resource: event.methodArn,
          },
        ],
      };

    return policyDocument;
  };