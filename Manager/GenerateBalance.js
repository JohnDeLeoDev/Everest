import React from 'react';
import {GetStoreBalances, SiteMgrBalanceRequest} from '../API.js';

/**
 * @brief Generate reports for site manager
 */


//*************************************************** */
export function GenerateStoreBalance(props)
/**
 * @brief Generate the Sales Balance for All Stores
 ****************************************************/
{
    //build structure ascending (default)
    // store name : "name"
    // store balance : "balance"
    //let storeBalances = props.storeBalances;
    //console.log("generate store bals: ", storeBalances)\

    let storeBalances = props.storeBalances;

    //const [storeBalances, setStoreBalances] = React.useState(null);
    //const [getBals, setGetBals] = React.useState(true)

    //function handleStoreBalances(balances){
    //    console.log("generate balances: ", balances)
    //    setStoreBalances(balances)
    //    setGetBals(false)
    //}

    function showBalances(){

        let balances = []
        if (storeBalances !== undefined && storeBalances !== null){
            for (let i of storeBalances){
                balances.push(
                <tr>
                    <td>{i.name}</td> 
                    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{i.storeBalance}</td>
                </tr>)
            }
        }

        return (
            <div>
                <table>
                    <th>
                        <tbody>
                        {balances}
                        </tbody>
                    </th>
                </table>
                
            </div>
        )
    }

    return (
        <div>
            <h2>Store Balances</h2>
            {storeBalances && showBalances()}
            <button className="Button" onClick={() => {props.handleStoreBalance(false)}}>Close</button>
        </div>
    )
}

//*************************************************** */
export function GenerateSiteManagerBalance(props)
/**
 *  @brief Generate the Site Manager's Balance
 *******************************************************/
{
    const [siteMgrBalanceRequest, setSiteMgrBalanceRequest] = React.useState(true);    

    return (
        <div>
            <h3>SITE MANAGER BALANCE</h3>
            <br/>
            <p>{props.siteBalance}</p>
            <button className="Button" onClick={() => {props.handleSiteManagerBalance(false)}}>Close</button>
            {siteMgrBalanceRequest && <SiteMgrBalanceRequest  handleSiteBalance={props.handleSiteBalance}/>}
        </div>
    )
}


