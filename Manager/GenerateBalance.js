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

    let json = {
        
    }

    const [storeBalances, setStoreBalances] = React.useState(null);
    const [getBals, setGetBals] = React.useState(true)

    function handleStoreBalances(balances){
        console.log("generate balances: ", balances)
        setStoreBalances(balances)
    }

    return (
        <div>
            <h2>Store Balances</h2>
            <GetStoreBalances json={json} handleStoreBalances={handleStoreBalances}/>
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


