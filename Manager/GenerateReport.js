//Generate Reports

import { SearchStores } from "../Customer/Search";
import { GetSiteInventoryBalances } from "../API";
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
    const [siteInventoryBalances, setSiteInventoryBalances] = React.useState(null);

    //set the balances from the data string
    function handleSiteInventoryBalances(balances){
        setSiteInventoryBalances(JSON.parse(balances));
    }

    //handle the event
    function handleSiteInventoryRequest(event) {
        event.preventDefault();
        setSiteInventoryRequest("SiteInventoryBalances");
        
    }

    return (
        <GetSiteInventoryBalances 
            siteInventoryRequest={props.siteInventoryRequest}   //the request name
            handleSiteInventoryBalances={props.handleSiteInventoryBalances} //this sets the balances                   //
        />
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