import { type } from '@testing-library/user-event/dist/type';
import { wait } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'; 
import { test_stores } from './Manager/testStores';

//**************************************************************** */
export function LoginRequest(props) 
/**
 * @brief Login request to server (POST)
 *    
 * @parameters
 *      props.json: the request from the calling function
 * @returns
 *      success (200) or error
 ********************************************************************/
{   // PRE POPULATE THE LOGINREQUEST WITH ALL THE JSON DATA PASSED TO THE FUNCTION
    // THIS IS THE USERNAME AND PASSWORD INFO COLLECTED FROM THE LOGIN VIEW
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
 * @brief create a new store (POST)
 * 
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
 * @brief request to remove a store from the server by storeID (POST)
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
                props.handleSiteInventory(body);
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
 * @brief function to remove a computer, must also add 25$ to SiteManager profit
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
        props.handleModifyComputerResponse(response);
    }

    let json = JSON.parse(props.json);

    useEffect(() => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(json)
            };

            fetch('https://kodeky0w40.execute-api.us-east-1.amazonaws.com/Initial/modifyComputer', requestOptions)
                .then(response => response.json())
                .then(data => handleModifyComputerResponse(data));
        }, []);
}

//************************************************************************************** */
export function AddBalanceRequest(props) 
/**
 * @brief add to the site manager balance
 * 
 * @parameters  sent in props
 *      .amount: amount to add to balance
 * 
 * @returns
 *      looking for a status 200 OK reply 
 ******************************************************************************************/
{
    let amount = props.amount;
    let json = {
        "amount": amount
    };

    const [addBalanceRequest, setAddBalanceRequest] = React.useState(props.json);
    const [addBalanceResponse, setAddBalanceResponse] = React.useState(null);

    function handleAddBalanceRequest(json) {
        setAddBalanceRequest(json);
    }

    function handleAddBalanceResponse(response) {
        if (response !== null && response !== undefined) {
            console.log(response);
        }
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(json)
        };
        console.log(requestOptions);

        fetch('https://kodeky0w40.execute-api.us-east-1.amazonaws.com/Initial/addBalanceSM', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data !== null && data !== undefined) {
                    handleAddBalanceResponse(data);
                }
            });
    }, []);
}

//********************************************************************************** */
export function RemoveBalanceRequest(props) 
/**
 * @brief 
 * 
 * @parameters delivered in props
 *      .userID: the user ID
 *      .amount: the amount to remove from the store balance
 *      .json: the request to be set
 * @returns
 *      looking for an OK 200 status 
 ***************************************************************************************/
{
    let userID = props.userID;
    let amount = props.amount;
    let json = {
        "userID": userID,
        "amount": amount
    };

    const [removeBalanceRequest, setRemoveBalanceRequest] = React.useState(props.json);
    const [removeBalanceResponse, setRemoveBalanceResponse] = React.useState(null);

    function handleRemoveBalanceRequest(json) {
        setRemoveBalanceRequest(json);
    }

    function handleRemoveBalanceResponse(response) {
        if (response !== null && response !== undefined) {
            console.log(response);
        }
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(json)
        };

        fetch('https://kodeky0w40.execute-api.us-east-1.amazonaws.com/Initial/removeBalanceSO', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data !== null && data !== undefined) {
                    handleRemoveBalanceResponse(data);
                }
            });
    }, []);
}


//******************************************************************************* */
export function GetCustomerStoreInventory(props)
/**
 * @brief function to get the inventory from one store to display for the customer
 * 
 * @parameters
 *      json: the request - the storeID passed from the Search > Stores
 **********************************************************************************/
{
    var json = JSON.parse(props.json)
    var jsonBody = json.inventoryID;

    //this is the info we need from the query 
    /*
        {computer.brand} 
        {computer.model}
        {computer.description}
        {computer.price}
        {computer.memory}
        {computer.storageSize}
        {computer.processor}
        {computer.processGen}
        {computer.graphics}
    */
}


//**************************************************************** */
export function ListStoresRequest(props) 
/**
 * @brief get the a list of all stores in the database
 * @parameters
 *      handleStores: the response from the request
 *      
 * @returns
 *      list of stores
 *      
 *****************************************************************************/
{
   function handleListStoresResponse(response) { 
    
        if (response !== null && response !== undefined) {
                
                props.handleStores(response)
            }
    }

    useEffect(() => {
    
        fetch('https://nrhklg72za.execute-api.us-east-1.amazonaws.com/default/getStores')
            .then(response => response.json())
            .then(data => {
                if (data !== null && data !== undefined) {
                    handleListStoresResponse(data);
                }
            });

    }, []);
}

//**************************************************************** */
export function SearchStoreInventoryRequest(props) 
/**
 * @brief function to get the inventory from selecting store(s) to retrieve 
 *        ** use case from req. doc is ONE store or ALL Stores **
 * @parameters
 *      json: the request from calling function
 *      handleCustomerStoreInventory: set the store inventory from 
 *          response
 *********************************************************************/
{
    const [searchStoreInventoryRequest, setSearchStoreInventoryRequest] = React.useState(props.json);
    const [searchStoreInventoryResponse, setSearchStoreInventoryResponse] = React.useState(null);

    function handleSearchStoreInventoryRequest(json) {
        setSearchStoreInventoryRequest(json);
    }

    function handleSearchStoreInventoryResponse(response) {
        if (response !== null && response !== undefined) {
            props.handleCustomerStoreInventory(response);
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
            fetch('https://kodeky0w40.execute-api.us-east-1.amazonaws.com/Initial/searchStoreInventory', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data !== null && data !== undefined) {
                        handleSearchStoreInventoryResponse(data);
                    }
                });
        } else {
            console.log("Error occurred.");
        }
        }, [props.json]);
}

//**************************************************************************************** */
export function SiteMgrBalanceRequest(props) 
/**
 * @brief get the balance for the site manager (profit)
 * 
 * @parameters passed in with props
 *      .json: the json request
 *      .handlSiteBalance()
 * @returns
 *      the balance amount in props.handlSiteBalance()
 *******************************************************************************************/
{
    const [siteMgrBalanceRequest, setSiteMgrBalanceRequest] = React.useState(props.json);
    const [siteMgrBalanceResponse, setSiteMgrBalanceResponse] = React.useState(null);

    function handleSiteMgrBalanceRequest(json) {
        setSiteMgrBalanceRequest(json);
    }

    function handleSiteMgrBalanceResponse(response) {
        let body = response.body;
        body = JSON.parse(body);
        let balanceAmount = body.balanceAmount;
        props.handleSiteBalance(balanceAmount);   
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*'
            },
        };
        console.log(requestOptions);
        fetch('https://kodeky0w40.execute-api.us-east-1.amazonaws.com/Initial/reportSiteMgrBalance', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data !== null && data !== undefined) {
                    handleSiteMgrBalanceResponse(data);
                }
            });
        }, [props.json]);
}

//************************************************************************ */
export function GetStoreLatLong(props)
/**
 * @brief get the latitude and longitude for the store that we are buying from
 * 
 * @parameters come in with props
 *      .json: the computerID to get the store to get the lat/long
 *      .handleStoreCoordinates(lat, lon): get the coordinates
 *      .handleComputerDNE(bool): if an error comes back that the computerID isn't in the db 
 *          then we send an error saying the computer they are trying to buy is not available
 * 
 * @returns
 *      Store.lat, Store.longitude
 *****************************************************************************/
{
    //we have the computer id, we need the store id
    //send computer id and expect back the store lat/long
    const [storeLatLonRequest, setStoreLatLonRequest] = React.useState(props.json);
    const [storeLatLonResponse, setStoreLatLonResponse] = React.useState(null);

    function handleStoreLatLonRequest(json) {
        setStoreLatLonRequest(json);
    }

    function handleStoreLatLonResponse(response) {
        let body = response.body;
        body = JSON.parse(body);
        let lat = body.lat;
        let lon = body.lon;
        props.handleStoreCoordinates(lat, lon);   
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*'
                },
            body: JSON.stringify(props.json)
        };
        fetch('https://kodeky0w40.execute-api.us-east-1.amazonaws.com/Initial/getStoreLatLon', requestOptions)           //needs a lambda and an api gateway 
            .then(response => response.json())
            .then(data => {
                if (data !== null && data !== undefined) {
                    handleStoreLatLonResponse(data);
                }
            });
        }, [props.json]);
}

//*************************************************************************** */
export function BuyComputer(props)
/**
 * @brief buy the computer
 * 
 *      needs to:
 *          pay the store owner     
 *          pay the site manager
 *          remove the computer from inventory
 *          return status
 * 
 * @parameters
 *      .json
 *      .handleBuyStatus(good or bad)
 *********************************************************************************/
{
    //need the computerID
    //need the $$ for site manager
    //need the $$ for store owner
    //status - success
    const [buyComputerRequest, setBuyComputerRequest] = React.useState(props.json);
    const [buyComputerResponse, setBUyComputerResponse] = React.useState(null);

    function handleBuyComputerRequest(json) {
        setBuyComputerRequest(json);
    }

    //handle sending the confirmation that the purchase was successful
    function handleBuyComputerResponse(response) {
        if (response["body-json"]["statusCode"] === 200) {
            props.handleBuyComputer(true);  
        } 
        else {
            props.handleBuyComputer(false);
        }
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*'
                },
            body: JSON.stringify(props.json)
        };
        fetch('https://kodeky0w40.execute-api.us-east-1.amazonaws.com/Initial/buyComputer', requestOptions)           //needs a lambda and an api gateway 
            .then(response => response.json())
            .then(data => {
                if (data !== null && data !== undefined) {
                    handleBuyComputerResponse(data);
                }
            });
        }, [props.json]);
}
