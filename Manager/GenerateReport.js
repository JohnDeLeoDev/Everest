//Generate Reports

import { SearchStores } from "../Customer/Search";

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
 * @brief generate balances of (EVERY?) store
 *      TODO: put a button in to sort ascending/descending
 **************************************************************/
{
    //there must be a better way to temporarily store the stores
    //const objArray = JSON.parse(props.stores);
    const objArray = props.stores;
    const sortedObjArray = objArray.sort(compareBalance);  //sorts ascending by default
    const reportBody = []
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (props.descending){
        //build structure ascending
        for (let i = (objArray.length-1); i > 0; i--){
            reportBody.push(
                <tr>
                <td>{sortedObjArray[i].name}</td>
                <td>{sortedObjArray[i].storeBalance}</td>
            </tr>
            )
        }
    } else {
        //build structure ascending (default)
        for (let i=0; i < objArray.length;i++){
            //build structure ascending
            reportBody.push(
                <tr key={sortedObjArray[i].storeID}>
                <td>{sortedObjArray[i].name}</td>
                <td>{sortedObjArray[i].storeBalance}</td>
            </tr>
            )
        }
    }

    return (
        <div className="bodybag">
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
    )
}

export function GenerateStoreInventoryReport() {
    
    //by store - search for store and click on store to go to store site

    //by all stores - for each store on the site generate inventory report
    //with computers listed in ascending or descending order by price

    return (
        <div>
            Select Store to Generate Report
            <SearchStores />
        </div>
    )
}