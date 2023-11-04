const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
      host: db_access.config.host,
      user: db_access.config.user,
      password: db_access.config.password,
      database: db_access.config.database

  });

  
  let name = event.name;
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
  let lat = Number(event.lat);
  let long = Number(event.long);
  let description = event.description;
  let response = {};
  
  
  console.log("LAT/LONG INFO...");
  console.log(lat);
  console.log(long);
  
  
  let userQuery = "INSERT INTO Users (userID, userFirst, userLast, userEmail, userStreet, userCity, userState, userZip, userType, password) VALUES ('" + email + "', '" + fname + "', '" + lname + "', '" + email + "', '" + address + "', '" + city + "', '" + state + "', '" + zip + "', 0, '" + password + "');"

  let result = await new Promise((resolve, reject) => {
      pool.query(userQuery, (err, res) => {
          if (err) {
              console.log(err);
              response = {
                  statusCode: 400,
                  body: JSON.stringify('Error: User already exists.'),
              };
              reject(response);
          } else {
              console.log(res);
              resolve(res);
          }
      });
  });
  
  let storeQuery = "INSERT INTO Stores (name, description, storeOwner, long, lat) VALUES ('" + name + "', '" + description + "', '" + email + "', '" + long + "', '" + lat + "');"


  result = await new Promise((resolve, reject) => {
      pool.query(storeQuery, (err, res) => {
          if (err) {
              console.log(err);
              response = {
                  statusCode: 400,
                  body: JSON.stringify('Error: Store already exists.'),
              };
              reject(response);
          } else {
              console.log(res);
              resolve(res);
          }
      });
  });


  response = {
      statusCode: 200,
      header: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify('Store created successfully'),
  };

  return response;
};
