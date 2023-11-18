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
 * @parameters
 *      json: the info from the create store intake form
 *      storeCreated: value indicating successful store creation
 *      handleFailedStore: function to set boolean indicating if store is created
 *      
 * @returns
 *      good, or error
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
        if (response !== null && response !== undefined) {
                if (response["statusCode"] === 200) {                
                    let jsonBody = response["body"];
                    let user = jsonBody["user"];
                    let userType = jsonBody["userType"];
                    props.handleStoreCreated(true);
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
    const [removeStoreRequest, setRemoveStoreRequest] = React.useState(props.json);
    const [removeStoreResponse, setRemoveStoreResponse] = React.useState(null);

    const json = JSON.stringify(removeStoreRequest);
    function handleRemoveStoreResponse(response) {
        setRemoveStoreResponse(response);
    }

     //contact server
     useEffect(() => {

        //the request
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': '*',
            //'Access-Control-Allow-Headers': '*'
            },
            //body: JSON.stringify(props.json)
            body: {
                "name": removeStoreRequest
            }
        };

        requestOptions.body = JSON.stringify(requestOptions.body);

        fetch('https://1pw1l3rxk2.execute-api.us-east-1.amazonaws.com/default/removeStore', requestOptions)
            .then(response => {
                //console.log(response);
                response.json();
            })
            .then(data => handleRemoveStoreResponse(data));
        }, []);   

    
   /* const requestOptions= {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': '*',
            //'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(props.removeStoreRequest)
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
        }, []);*/

   // return removeStoreResponse;

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
 * @parameters
 *        handlSiteInventoryBalances: returns response to the calling function
 *        json: the json string with 
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
export function GetStoreInventory(props) 
/**
 * @brief get the inventory of the store (default store owner page on login)
 * @parameters
 *      userID: userID of the store for the inventory request
 *      handleInventory: the function to set the inventory in
 * @returns
 *      status good or error 
 *      the inventory is set and ready to propagate on the page
 *****************************************************************************/
{
    function handleGetStoreInventoryResponse(response) {
        if (response !== null && response !== undefined) {
            if (response.statusCode === 200) {
                let body = JSON.parse(response.body);
                props.handleInventory(body);
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

//********************************************************************************** */
export function SearchComputersRequest(props) 
/**
 * @brief function to request computer search filters
 * @parameters 
 *      json: the body of the POST request - name:value strings
 * @returns
 *      data is returned for display access by setting in fetch
 *      handleSearchComputersResponse(data)
 **************************************************************************************/
{
    const [searchComputersRequest, setSearchComputersRequest] = React.useState(props.json);
    const [searchComputersResponse, setSearchComputersResponse] = React.useState(null);

    function handleSearchComputersRequest(json) {
        setSearchComputersRequest(json);
    }

    function handleSearchComputersResponse(response) {
        if (response !== null && response !== undefined) {
            props.handleSearchResults(response);
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
            fetch('https://5zdrqejw41.execute-api.us-east-1.amazonaws.com/default/searchComputers', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data !== null && data !== undefined) {
                        handleSearchComputersResponse(data);
                    }
                });
        } else {
            console.log("Error occurred.");
        }
        }, [props.json]);
}

//**************************************************************************** */
export function RemoveComputerRequest(props) 
/**
 * @brief function to remove a computer
 *******************************************************************************/
{
    const [removeComputerRequest, setRemoveComputerRequest] = React.useState(props.json);

    function handleRemoveComputerRequest(json) {
        setRemoveComputerRequest(json);
    }

    function handleRemoveComputerResponse(response) {
        if (response !== null && response !== undefined) {
            props.handleRemoveComputerResponse(response);
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

            console.log(requestOptions);
            fetch('https://2k1f90kjwa.execute-api.us-east-1.amazonaws.com/default/removeComputer', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data !== null && data !== undefined) {
                        handleRemoveComputerResponse(data);
                    }
                });
        } else {
            console.log("Error occurred.");
        }
        }, [props.json]);
}

//*************************************************************************************** */
export function ModifyComputerRequest(props) 
/**
 * @brief function to modify the price of a computer
 * @parameters
 *      json: request body
 *      handleModifyCOmputerResponse(response): returns request status to calling function
 * @returns 
 *      returns request status good, or error
 ******************************************************************************************/
{
    const [modifyComputerRequest, setModifyComputerRequest] = React.useState(props.json);

    function handleModifyComputerRequest(json) {
        setModifyComputerRequest(json);
    }

    function handleModifyComputerResponse(response) {
        if (response !== null && response !== undefined) {
            console.log(response);
        }
    }
    var json = JSON.parse(props.json)

    var jsonBody = {
        "inventoryID": json.inventoryID,
        "brand": json.brand,
        "model": json.model,
        "description": json.description,
        "price": json.price,
        "memory": json.memory,
        "storageSize": json.storageSize,
        "processor": json.processor,
        "processGen": json.processGen,
        "graphics": json.graphics
    }

    useEffect(() => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(jsonBody)
            };

            fetch('https://zgah4gqjia.execute-api.us-east-1.amazonaws.com/default/modifyComputer', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data !== null && data !== undefined) {
                        handleModifyComputerResponse(data);
                    }
                });
        }, []);
}