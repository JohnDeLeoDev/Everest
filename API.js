import React, { useEffect, useState } from 'react'; 

//**************************************************************** */
export function LoginRequest(props) 
/**
 * @brief Login request to server
 *    
 * @parameters
 *      props.json: the request from the calling function
 * @returns
 *      success (200) or error
 ********************************************************************/
{
    const [loginRequest, setLoginRequest] = React.useState(props.json);
    const [loginResponse, setLoginResponse] = React.useState(null);

    function handleLoginRequest(json) {
        setLoginRequest(json);
    }

    function handleLoginResponse(response) {
        if (response !== null || response !== undefined) {
            let json = response["body-json"];
            let body = json.body;
            let user = body.user;
            let userType = body.userType;
            props.handleUser([user, userType]);
        }
    }

    useEffect(() => {
        let userID = loginRequest.userID;
        let password = loginRequest.password;
        let json = {
            "userID": userID,
            "password": password
        };

        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(json)
            
        };

        fetch('https://je60qiy1fi.execute-api.us-east-1.amazonaws.com/default/handleLogin', requestOptions)
            .then(response => response.json())
            .then(data => handleLoginResponse(data));

        }, []);
}

//********************************************************** */
export function CreateStoreRequest(props) 
/**
 * @brief create a new store
 */
{
    const [createStoreRequest, setCreateStoreRequest] = React.useState(props.json);
    const [createStoreResponse, setCreateStoreResponse] = React.useState(null);

    function handleCreateStoreRequest(json) {
        setCreateStoreRequest(json);
    }

    function handleCreateStoreResponse(response) {
        if (response !== null || response !== undefined) {
            console.log(response);
            let json = response;
            let body = json.body;
            setCreateStoreResponse(json);
        }
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
            },
            body: createStoreRequest
        };

        console.log(requestOptions);

        fetch('https://3wg7dcs0o4.execute-api.us-east-1.amazonaws.com/default/createStore', requestOptions)
            .then(response => response.json())
            .then(data => handleCreateStoreResponse(data));
    }, []);
    }

//**************************************************************** */
export function RemoveStoreRequest(props)
/**
 * @brief request to remove a store from the server by storeID
 * 
 * @parameters
 *      props.storeID: the ID of the store to remove
 * @returns
 *      status good (200) if success, else error
 *******************************************************************/
{
    //todo
    const [removeStoreRequest, setRemoveStoreRequest] = React.useState(props.json);
    const [removeStoreResponse, setRemoveStoreResponse] = React.useState(null);

    function handleRemoveStoreRequest(json) {
        setRemoveStoreRequest(json);
    }

    function handleRemoveStoreResponse(response) {
        setRemoveStoreResponse(response);
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(removeStoreRequest)
        };

        fetch('https://3wg7dcs0o4.execute-api.us-east-1.amazonaws.com/default/createStore', requestOptions)
            .then(response => {
                console.log(response);
                response.json();
            })
            .then(data => {
            console.log(data);
            setRemoveStoreResponse(data);
            return data;
            })
        }, []);

    return removeStoreResponse;

}


//***************************************************************** */
export function AddComputer(props)
/**
 * @brief add a computer to the database for a particular store
 * 
 * @parameters 
 *      props.storeID
 *      props.computer (this can be the template from computer_cfg)
 *********************************************************************/
{
    //TODO
}

//************************************************************** */
function calculateInventoryBalance(siteInventoryData)
/**
 * @brief helper function to calculate the inventory total per store
 *        in lambda, join is done to return an array of store names
 *          and computer prices
 * 
 * @parameters data recieved is in the format:
 *      siteInventoryData: {"name":Store.name, "price":Computer.price}
 * 
 * @returns the siteInventoryBalances - a Set of all names is keys, 
 *          value per key is the sum of all computers in the store
 ********************************************************************/
{
    //debug prints - verify 
    console.log(siteInventoryData);
    console.log(siteInventoryData.name[0])
    console.log(siteInventoryData.price[0])

    //create a dictionary init to 0
    //keys are unique store names
    let newset = new Set(siteInventoryData.store);
    console.log(newset);
    //create dict and init
    let balances = {}

    //loop through data param val, 
    //balances[]+=price[i]
}

//*********************************************** */
export function GetSiteInventoryBalances(props)
/**
 * @brief this function connects the web app to lambda
 *          to get the inventory balance for stores
 * @param 
 *        props.storeID (int): the id of the store req.
 *                  if null, get all stores
 ****************************************************/
{
    const [getSiteInventoryBalReqest, setGetSiteInventoryBalRequest] = React.useState(props.json);
    const [getSiteInventoryBalResponse, setGetSiteInventoryBalResponse] = React.useState(null);

    //send the request with the reportType = SiteInventoryBalances
    function handleSiteInventoryBalRequest(json) {
        setGetSiteInventoryBalRequest(json);
    }

    //get back the balances
    function handleSiteInventoryBalResponse(response) {
        setGetSiteInventoryBalResponse(response);
        props.handleSiteInventoryBalances(response);
    }

    //contact server
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            /*headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
            }*/
        };

        // which one do i need here?
        //fetch('https://zxs5scvkbc.execute-api.us-east-1.amazonaws.com/first', requestOptions)
        //fetch('arn:aws:execute-api:us-east-1:810353635676:zxs5scvkbc/*/GET/getSiteInventory', requestOptions)
        fetch('https://3wg7dcs0o4.execute-api.us-east-1.amazonaws.com/default/getSiteInventory', requestOptions)
            .then(response => {
                console.log(response);
                response.json();
            })
            .then(data => {     //this it the array of store names and price per computer
            
            setGetSiteInventoryBalResponse(data);
            //props.handleSiteInventoryBalances(data);
            return data;
            })
        }, []

    )

    return getSiteInventoryBalResponse
        
}