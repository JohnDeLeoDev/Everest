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


//********************************************************************************
function helpCalculate(siteInventoryData, sort)
/**
 *
 ***********************************************************************************/
{
    //create a dictionary init to 0
    //keys are unique store names
    let storeList = []

    let sortOrder = sort
    // FOR EACH STORE/COMPUTER ITEM PRICE PAIR IN THE LIST, ADD IT'S NAME
    // TO THE LIST OF ENTRIES

    console.log("In helpCalc")
    console.log(siteInventoryData)

    for (let i of siteInventoryData){
        storeList.push(i.name);
    }

    //USE SET TO REMOVE DUPLICAT ENTIRES AND CREATE A NEW SET
    let newset = new Set(storeList);    

    // CREATE A MAP AND ADD ALL NAMES TO MAPPPING WITH A DEFAULT VALUE OF 0 AS THE KEY
    let map = new Map();
   
    for (let i of newset){
        map.set(i, 0)
    }

    //add values to map
    // FOR EACH OF THE STORE/COMPUTER COST PAIRS IN THE LIST
    for (let i of siteInventoryData){
        // PULL THE VALUE FROM THE MAP BASED ON THE CURRENT ITEMS NAME AND STORE IN TEMPVAL
        let tmpVal = map.get(i.name)
        // ADD THE CURRENT ITEMS VALUE TO THE VALUE STORED IN THE TEMPVAL
        tmpVal += i.price
        // UPDATE THE STORE NAMES MAP ENTRY WITH THE NEW VALUE
        map.set(i.name, tmpVal)
    }

    console.log(map)

    // SET THE SORT ORDER OF THE RESULTS
    if(sortOrder === 0){

        // ASC ORDER
        map = new Map([...map.entries()].sort((a,b)=>a[1]-b[1]))  

    } else{

        // DESC ORDER
        map = new Map([...map.entries()].sort((a,b)=>b[1]-a[1]))
    }
   

    console.log(map)
    // RETURN MAPPING OF STORE TO TOTAL VALUE IN INVENTORY
    return map;
}

//************************************************************** */
function calculateInventoryBalance(siteInventoryData, sort)
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

    let sortOrder = sort

    let map = helpCalculate(siteInventoryData, sort)

    

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
    console.log(inventoryData)

    //add values to map
    for (let i of inventoryData){
        sitewideTotal += i.price
        console.log("total: " + sitewideTotal)
    }

    return sitewideTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
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
    const rawNums = props.siteInventoryBalances;
    const sortedBalances = {};//balances.sort(compareBalance);  //sorts ascending by default
    const reportBody = []
    let siteTotal = 0;

    console.log("RAW: ", rawNums)
  
    //set all store inventory balances
    const [siteInventoryBalances, setSiteInventoryBalances] = React.useState(null);
    
    //set the total inventory for entire site
    const [siteInventoryTotal, setSiteInventoryTotal] = React.useState(null);

    //ascending/descending sort for inventory - TODO - by final iteration
    const [sortDirection, setSortDirection] = React.useState(1);

    const [sortAsc, setSortAsc] = React.useState(null);
    const [sortDesc, setSortDesc] = React.useState(true);

    //set sort direction
    function handleSortAsc(bool){
        setSortAsc(bool)
        setSortDesc(!bool)
    }

    function handleSortDesc(bool){
        setSortDesc(bool)
        setSortAsc(!bool)
    }

    //handle the event
    if (props.setStoreReport === "Site"){
        return (
            <div>
                Total Site Inventory Value 
                <h3>{rawNums && totalInventoryTotals(rawNums)}</h3>
                <button className="Button" onClick={() => {props.handleSetStoreReport("")}}>Close</button>
            </div>
        )
    } else {

    return (
        <div>
            <button onClick={() =>{handleSortAsc(true)}}>Sort Ascending</button>
            <button onClick={() => {handleSortDesc(true)}}>Sort Descending</button>
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
        </tbody>
            </table>

            {rawNums && sortAsc && calculateInventoryBalance(rawNums, 0)}  
            {rawNums && sortDesc && calculateInventoryBalance(rawNums, 1)}

            <button className="Button" onClick={() => {props.handleSetStoreReport("")}}>Close</button>
        </div>
    )
}

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




    //const date = new Date();
    //const day = date.getDay();
    //const month = date.getMonth();
    //const year = date.getFullYear();