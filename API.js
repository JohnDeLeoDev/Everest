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

    function handleFailedLogin() {
        props.handleFailedLogin(true);
    }

    function handleLoginResponse(response) {
        if (response !== null || response !== undefined) {
            if (response["body-json"]["statusCode"] === 200) {
                let json = response["body-json"];
                let body = json.body;
                let user = body.user;
                let userType = body.userType;
                let stores = body.stores;
                props.handleUser([user, userType, stores]);
            } else {
                handleFailedLogin();
            }
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
 **************************************************************/
{
    const [createStoreRequest, setCreateStoreRequest] = React.useState(props.json);
    const [createStoreResponse, setCreateStoreResponse] = React.useState(null);

    function handleCreateStoreRequest(json) {
        setCreateStoreRequest(json);
    }

    function handleFailedStore() {
        props.handleFailedStore(true);
    }

    function handleCreateStoreResponse(response) {
        if (response !== null || response !== undefined) {
            if (response["body-json"]["statusCode"] === 200) {
                let json = response["body-json"];
                let body = json.body;
                let user = body.user;
                let userType = body.userType;
                props.handleUser([user, userType]);
            } else {
                handleFailedStore();
            }
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
            //'Access-Control-Allow-Origin': '*',
            //'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(removeStoreRequest)
        };

        fetch('https://1pw1l3rxk2.execute-api.us-east-1.amazonaws.com/default/removeStore', requestOptions)
            .then(response => {
                console.log(response);
                response.json();
            })
            .then(data => {
            console.log(data);
            setRemoveStoreResponse(data);
            //return data;
            })
        }, []);

}


//***************************************************************** */
export function AddComputerRequest(props)
/**
 * @brief add a computer to the database for a particular store
 * 
 * @parameters 
 *      props.storeID
 *      props.computer (this can be the template from computer_cfg)
 *********************************************************************/
{
    
    function handleAddComputer(response) {
        if (response !== null && response !== undefined) {
            let responseJson = JSON.parse(response["body-json"]);
            if (responseJson !== null && responseJson !== undefined) {
                if (responseJson.statusCode === 400) {
                    console.log("Error: " + responseJson.body);
                } else if (responseJson.statusCode === 200) {
                    let body = JSON.parse(responseJson.body);
                    props.handleInventory(body);
                }
            }
        }
    }

    console.log(props.json);

    useEffect(() => {
        console.log(props.json);
        if (props.json !== null && props.json !== undefined) {
            const requestOptions = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(props.json)
            };

            console.log(requestOptions);

            fetch('https://kodeky0w40.execute-api.us-east-1.amazonaws.com/Initial/addcomputer', requestOptions)
                .then(response => response.json())
                .then(data => handleAddComputer(data));
        } else {
            console.log("All fields must be filled out.");
        }
        }, []);
    
}

//************************************************************************************************* */
export function GetSiteInventoryBalancesRequest(props)
/**
 * @brief this function connects the web app to lambda to get the inventory balance for all stores
 *      on the website
 *          
 * @param 
 *        props.handlSiteInventoryBalances
 ****************************************************************************************************/
{
    const [getSiteInventoryBalReqest, setGetSiteInventoryBalRequest] = React.useState(props.json);
    const [getSiteInventoryBalResponse, setGetSiteInventoryBalResponse] = React.useState(null);

    //send the request with the reportType = SiteInventoryBalances
    function handleSiteInventoryBalRequest(json) {
        setGetSiteInventoryBalRequest(json);
    }

    //get back the balances to the calling function
    function handleSiteInventoryBalResponse(response) {
        if(response !== null && response !== undefined){
            setGetSiteInventoryBalResponse(response);
            props.handleSiteInventoryBalances(response);
        } else {
            console.log("ERROR SITE INVENTORY RESPONSE")
        }
        
    }

    //contact server
    useEffect(() => {
        //the request
        const requestOptions = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin':'*',        //seems this get shit works better without this nonsense
            //'Access-Control-Allow-Headers':'*'
            }
        };

        fetch('https://zxs5scvkbc.execute-api.us-east-1.amazonaws.com/default/getSiteInventory', requestOptions)
            .then(response => response.json())
            .then(data => handleSiteInventoryBalResponse(data));
        }, []);        
}

//*************************************************************************** */
export function GetStoreInventory(props) 
/**
 * @brief function to get the inventory of the store whose owner is logged in
 * 
 * @parameters props:
 *      userID: the login handle, which is saved in a store context in DB
 *  
 ******************************************************************************/
{
    function handleGetStoreInventoryResponse(response) {
        if (response !== null || response !== undefined) {
            let responseJson = JSON.parse(response["body-json"]);
            console.log(responseJson);
            if (responseJson["statusCode"] === 200) {
                if (responseJson !== null && responseJson !== undefined) {
                    if (responseJson.statusCode === 400) {
                        console.log("Error: " + responseJson.body);
                    } else if (responseJson.statusCode === 200) {
                        let body = JSON.parse(responseJson.body);
                        props.handleInventory(body);
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (props.userID !== null && props.userID !== undefined) {
            let json = {
                "userID": props.userID,
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

            fetch('https://wq3n7gl1h0.execute-api.us-east-1.amazonaws.com/Initial/getStoreInventory', requestOptions)
                .then(response => response.json())
                .then(data => handleGetStoreInventoryResponse(data));
    } else {
        console.log("Error: userID is null or undefined.");
        props.handleInventory(null);
    }
    }, []);
}