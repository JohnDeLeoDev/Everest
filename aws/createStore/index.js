const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
      host: db_access.config.host,
      user: db_access.config.user,
      password: db_access.config.password,
      database: db_access.config.database

  });

  
  let name = event.arg1;
  let logo = event.logo;
  let fname = event.fname;
  let lname = event.lname;
  let email = event.email;
  let password = event.password;
  let usertype = event.usertype;
  let phone = event.phone;
  let address = event.address;
  let city = event.city;
  let state = event.state;
  let zip = event.zip;
  let country = event.country;
  let lat = event.lat;
  let longitude = event.longitude;
  let description = event.description;
  let response = {};
  
  
  
  // console.log("LAT/LONG INFO...");
  // console.log(lat);
  // console.log(long);
  
  
    let userQuery = "INSERT INTO Users (userID, userFirst, userLast, userEmail, userStreet, userCity, userState, userZip, userType, password) VALUES ('" + email + "', '" + fname + "', '" + lname + "', '" + email + "', '" + address + "', '" + city + "', '" + state + "', '" + zip + "', 0, '" + password + "');"
  let result = await new Promise((resolve, reject) => {
      pool.query(userQuery, (err, res) => {
          if (err) {
            //   console.log(err);
            //   let message = JSON.stringify(err); // <== works to save the whole message for printing
            //   console.log(Object.values(err)); // SHOW ALL THE VALUES IN THE OBJECT
            //   console.log(Object.keys(err)); // SHOW ALL THE KEYS IN THE OBJECT
            //   console.log(err["code"]);  
            
            
            
              let errorCode = err["code"];  // EXTRACT THE ERROR CODE FROM THE JAVASCRIPT DATATYPE OF OBJECT. 
              let statusCode = err["errno"]  // EXTRACT THE ERROR NUMBER FROM THE JAVASCRIPT DATATYPE OF OBJECT. 
              let errStringBody = ("{ errorCode: " + errorCode + ", statusCode: " + statusCode + "}");
            
            console.log("IN THE ELSE STATEMENT....");
              response = {
                  statusCode: 1062,
                  body: JSON.stringify(errStringBody),
              };
              console.log("JUST BEFORE THE REJECT(RESPONSE)...");
              
          
            //  reject(response);
            //  return response;
          } else {
              console.log("IN THE ELSE STATEMENT....");
              console.log(res);
              resolve(res);
          }

          
      });
  });
  
  
  
// GET THE USERTYPE OF THE NEWLY CREATED USER 
    let typeQuery = 'SELECT userType FROM consignmentStore.Users WHERE userID = (?)';
    let typeResult = await new Promise((resolve, reject)=> {

        pool.query(typeQuery, [email],(err, res)=> {
            if(err) {
                console.log(err);
                response = {
                    statusCode: 400,
                    body: JSON.stringify('Error: User was not found'),
                };
                reject(response);
            }else{
                console.log(res);
                resolve(res);
            }
        });
    });
    
        // console.log("TYPE RESULT BELOW....");
        // console.log(typeResult[0].userType);



// ADD STORE TO THE STORES TABLE USING JSON STRING DATA
    let storeQuery = 'INSERT INTO Stores (name, description, storeOwner, longitude, lat) VALUES (?, ?, ?, ?, ?)';
    
    result = await new Promise((resolve, reject)=> {
        pool.query(storeQuery, [name, description, email, longitude, lat],(err, res)=> {
            if(err) {
               console.log(this.sql);
                console.log(err);
                response = {
                    statusCode: 400,
                    body: JSON.stringify('Error: Store already exists'),
                };
                reject(response);
            }else{
                console.log(res);
                resolve(res);
            }
        });
    });


// CREATE THE JSON RETURN AND SEND IT

    // let bodyString = ('{ user: " + email + ", userType: " + typeResult[0].userType + "}'); 
    let bodyString= {
        user: email,
        userType: typeResult[0].userType
    };
    
    
    // let bodyString = "Store created successfully.";


  response = {
      statusCode: 200,
      header: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      },
      body: bodyString
    //   body: JSON.stringify("Store created successfully"),
  };

  return response;
};
