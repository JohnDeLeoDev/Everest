/*****************************************************
 * Store owner inventory report
 * 
 * generates and totals the inventory in the store 
 **************************************************** */

export default function InventoryReport(props) {
    let balance = 0//props.storeProfit

    return (
        <div>
            <h1>Current Balance</h1>
                    {balance}
                    <br/><br/><br/>
            <button className="Button" onClick={() => {props.handleInventoryReport(false)}}>Close</button>
        </div>
    );
}