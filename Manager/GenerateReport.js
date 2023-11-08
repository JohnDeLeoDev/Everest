//Generate Reports

import { SearchStores } from "../Customer/Search";
import { GetSiteInventoryBalancesRequest } from "../API";
import React from "react";

//********************************************************** */
function compareBalance (a, b)
/**
 * @brief sort comparator
 * @parameters a: one item with a storeBalance
 *             b: the other item to compare storeBalance with a
 * @returns if a < b, then -1
 *          if a > b, then 1
 *          if a = b, then 0
 **************************************************************/
{
    if (a.storeBalance < b.storeBalance){ 
        return -1;
    } else if (a.storeBalance > b.storeBalance){
        return 1;
    } else {
        return 0;
    }
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
    //create a dictionary init to 0
    //keys are unique store names
    let storeList = []
    let balanceTable = []

    for (let i of siteInventoryData){
        storeList.push(i.name);
    }

    //the unique list of stores
    let newset = new Set(storeList);    

    //map
    let map = new Map();
    for (let i of newset){
        map.set(i, 0)
    }

    //add values to map
    for (let i of siteInventoryData){
        let tmpVal = map.get(i.name)
        tmpVal += i.price
        map.set(i.name, tmpVal)
    }

    //get the return
    for (let [key, value] of map) {
        balanceTable.push(
            <tr>
                <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {key}</td>
                <td>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  {value.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</td>
            </tr>
        )
        console.log(key + " = " + value.toLocaleString());
    }
    

    return balanceTable
}

//*********************************************************** */
export function GenerateAllStoreInventoryReport(props)
/**
 * @brief generate inventory balances for every store
 *      TODO: put a button in to sort ascending/descending
 **************************************************************/
{
    //const objArray = JSON.parse(props.stores);
    const sortedBalances = {};//balances.sort(compareBalance);  //sorts ascending by default
    const reportBody = []
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    // GenerateReport triggers a GET request to the server
    const [siteInventoryRequest, setSiteInventoryRequest] = React.useState(null);
    //this
    const [siteInventoryBalances, setSiteInventoryBalances] = React.useState(null);

    //set the balances from the data string
    function handleSiteInventoryBalances(balances){
        console.log("Received balances")
        let resp = JSON.parse(balances.body)
        console.log("RESPONSE", resp)
        let balanceSet = calculateInventoryBalance(resp)

        //now set the values
        setSiteInventoryBalances(balanceSet)
        console.log(siteInventoryBalances)
        console.log(balanceSet)
    }

    //handle the event
    function handleSiteInventoryRequest(event) {
        event.preventDefault();
        setSiteInventoryRequest("SiteInventoryBalances");
        
    }

    return (
        <div>
        <GetSiteInventoryBalancesRequest 
            handleSiteInventoryBalances={handleSiteInventoryBalances} //this sets the balances  with a request 
        />    
        <p> 
                Store Inventory Total Report 
            </p>
            <table>
                <thead>
                    <tr>
                        <th><h2>&nbsp; &nbsp; &nbsp; Store Name</h2></th>
                        <th><h2>&nbsp; &nbsp; &nbsp; Balance</h2></th>
                    </tr>
                </thead>
                <tbody>
        {siteInventoryBalances}
        </tbody>
            </table>
        </div>
    )
    
/*
    if (props.descending){
        //build structure ascending
        for (let i = (siteInventoryBalances.length-1); i > 0; i--){
            reportBody.push(
                <tr>
                    <td>{sortedBalances[i].storeName}</td>
                    <td>{sortedBalances[i].storeBalance}</td>
                </tr>
            )
        }
    } else {
        sortedBalances = siteInventoryBalances.sort(compareBalance)
        //build structure ascending (default)
        for (let i=0; i < siteInventoryBalances.length;i++){
            //build structure ascending
            reportBody.push(
                <tr>
                <td>{sortedBalances[i].StoreName}</td>
                <td>{sortedBalances[i].storeBalance}</td>
            </tr>
            )
        }
    }

    return (
        <div>
            <p> 
                Store Inventory Total Report {day}.{month}.{year}
            </p>
            <table>
                <thead>
                    <tr>
                        <th><h2>Store Name</h2></th>
                        <th><h2>Balance</h2></th>
                    </tr>
                </thead>
                <tbody>
                    {reportBody}
                </tbody>
            </table>
            <button className="Button" onClick={() => {props.handleSetStoreReport(null)}}>Close</button>
        </div>
    )*/
}

export function GenerateStoreInventoryReport(props) {
    
    //by store - search for store and click on store to go to store site

    //by all stores - for each store on the site generate inventory report
    //with computers listed in ascending or descending order by price

    return (
        <div>
            Select Store to Generate Report
            <SearchStores 
                stores={props.stores}
                user={props.user}
                />
        </div>
    )
}