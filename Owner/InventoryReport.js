/*****************************************************
 * Store owner inventory report
 * 
 * generates and totals the inventory in the store 
 **************************************************** */

import { GetOneStoreBalance } from "../API";
import React from "react";

export default function InventoryReport(props) {
    let user = props.user[0]

    let json = {
        "storeOwner":user
    }

    const [balance, setBalance] = React.useState(0);

    function handleBalance(resp){
        setBalance(resp)
    }

    return (
        <div>
            <h1>Current Balance</h1>
                    {balance.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}
                    <br/><br/><br/>
            <button className="Button" onClick={() => {props.handleInventoryReport(false)}}>Close</button>
        {(user!== null && user !== undefined) ?
            <GetOneStoreBalance json={json} handleBalance={handleBalance}/>:null}
        </div>
    );
}