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

function helpCalculate(siteInventoryData)
{
    //create a dictionary init to 0
    //keys are unique store names
    let storeList = []

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

    return map;
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
    let balanceTable = []       //an html table

    let map = helpCalculate(siteInventoryData)

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

//****************************************************************
function totalInventoryTotals(inventoryData)
/**
 * @brief calculate the total of all store totals (SITE WIDE TOTAL)
 * 
 * @parameters
 *      
 ********************************************************************/
{
    let sitewideTotal = 0;

    //add values to map
    for (let i of inventoryData){
        sitewideTotal += i.price
        console.log("total: " + sitewideTotal)
    }

    return sitewideTotal;
} 

//*********************************************************** */
export function GenerateInventoryReport(props)
/**
 * @brief generate inventory balances for every store
 *      TODO: add functionality to sort ascending/descending buttons
 *      TODO: center the page display
 **************************************************************/
{
    //const objArray = JSON.parse(props.stores);
    const sortedBalances = {};//balances.sort(compareBalance);  //sorts ascending by default
    const reportBody = []
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    let siteTotal = 0;

    // GenerateReport triggers a GET request to the server
    const [siteInventoryRequest, setSiteInventoryRequest] = React.useState(null);
    
    //set all store inventory balances
    const [siteInventoryBalances, setSiteInventoryBalances] = React.useState(null);
    
    //set the total inventory for entire site
    const [siteInventoryTotal, setSiteInventoryTotal] = React.useState(null);

    //ascending/descending sort for inventory - TODO - by final iteration
    const [sortDirection, setSortDirection] = React.useState("");

    //set the balances from the data string
    function handleSiteInventoryBalances(balances){
        console.log("Received inventory balances")
        let resp = JSON.parse(balances.body)
        console.log("RESPONSE", resp)
        let balanceSet = calculateInventoryBalance(resp)
        siteTotal = totalInventoryTotals(resp)
        console.log("SITE TOTAL " + siteTotal)
        setSiteInventoryTotal(siteTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }));

        //now set the values
        setSiteInventoryBalances(balanceSet)
        console.log(siteInventoryBalances)
        console.log(balanceSet)
    }

    //handle the event
    

    if (props.setStoreReport === "Site"){
        return (
            <div>
                <GetSiteInventoryBalancesRequest 
                    handleSiteInventoryBalances={handleSiteInventoryBalances} //this sets the balances  with a request 
                /> 
                Total Site Inventory Value
                <h3>{siteInventoryTotal}</h3>
                <button className="Button" onClick={() => {props.handleSetStoreReport("")}}>Close</button>
            </div>
        )
    } else {

    return (
        <div>
            <button onClick={() =>{setSortDirection("Ascending")}}>Sort Ascending</button>
            <button onClick={() => {setSortDirection("Descending")}}>Sort Descending</button>
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
                        <th><h2>&nbsp; &nbsp; &nbsp; Inventory Total</h2></th>
                    </tr>
                </thead>
                <tbody>
        {siteInventoryBalances}
        </tbody>
            </table>
            <button className="Button" onClick={() => {props.handleSetStoreReport("")}}>Close</button>
        </div>
    )
}
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


