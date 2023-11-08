import { wait } from '@testing-library/user-event/dist/utils';
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
        console.log(response);
        if (response !== null && response !== undefined) {
                if (response["statusCode"] === 200) {                
                    let jsonBody = response["body"];
                    let user = jsonBody["user"];
                    let userType = jsonBody["userType"];
                    props.handleStoreCreated(true);
                    console.log(props.storeCreated);
                    // let userType = jsonBody.userType;
                    // props.handleUser([user, userType]);
            } else if (response["errorMessage"]) {
                console.log("Duplicate entry...ignoring.");
            }else {
                if (props.storeCreated === null || props.storeCreated === undefined) {
                    console.log("INSIDE THE HANDLECREATESTORERESPONSE FAIL")
                    handleFailedStore();
                }
            }
        }
    }

    const requestOptions= {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*' 
        },
        body: createStoreRequest
    };

    fetch('https://3wg7dcs0o4.execute-api.us-east-1.amazonaws.com/default/createStore', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data !== null && data !== undefined) {
                handleCreateStoreResponse(data);
            }
        });
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
    const [removeStoreRequest, setRemoveStoreRequest] = React.useState(props.request);
    const [removeStoreResponse, setRemoveStoreResponse] = React.useState(null);

    const json = JSON.stringify(removeStoreRequest);
    function handleRemoveStoreResponse(response) {
        setRemoveStoreResponse(response);
    }

    const requestOptions= {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(removeStoreRequest)
        };

    fetch('https://huwr60n96b.execute-api.us-east-1.amazonaws.com/default/removeStore', requestOptions)
        .then(response => {
            console.log(response);
            response.json();
        })
        .then(data => {
        console.log(data);
        setRemoveStoreResponse(data);
        return data;
        })

    return removeStoreResponse;

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
            let body = response["body-json"];
            props.handleComputerAdded(true);
        } else {
            console.log("Error: response is null or undefined.");
        }
    }

    useEffect(() => {
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

            fetch('https://kodeky0w40.execute-api.us-east-1.amazonaws.com/Initial/addcomputer', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data !== null && data !== undefined) {
                        handleAddComputer(data);
                    }
                });
        } else {
            console.log("All fields must be filled out.");
        }
        }, [props.json]);
    
}

//************************************************************************************************* */
export function GetSiteInventoryBalancesRequest(props)
/**
 * @brief this function connects the web app to lambda to get the inventory balance for all stores
 *      on the website
 *          
 * @param 
 *        props.handlSiteInventoryBalances: returns response to the calling function
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

//**************************************************************** */
export function GetStoreInventory(props) {
    function handleGetStoreInventoryResponse(response) {
        if (response !== null && response !== undefined) {
            if (response.statusCode === 200) {
                let body = JSON.parse(response.body);
                props.handleInventory(body);
                console.log(body);
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
                .then(data => {
                    if (data !== null && data !== undefined) {
                        handleGetStoreInventoryResponse(data);
                    }
                });   
    } else {
        console.log("Error: userID is null or undefined.");
        props.handleInventory(null);
    }
    }, []);
}
