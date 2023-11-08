/*****************************************************
 * Store owner inventory report
 * 
 * generates and totals the inventory in the store 
 **************************************************** */

export default function InventoryReport(props) {
    let inventory = props.inventory;
    let inventoryReport = [];
    var total = 0;

    for (let key in inventory) {
        let item = inventory[key];
        total += Number(item.price);
        inventoryReport.push(
            <tr key={key}>
                <td>{item.brand} {item.model}</td>
                <td>{item.description}</td>
                <td>${item.price}</td>
                
            </tr>
        );
    }

    inventoryReport.push(
        <tr key="total">
            <td>Total</td>
            <td></td>
            <td>${total}</td>
        </tr>
    )

    return (
        <div>
            <h1>Inventory Report</h1>
            <table>
                <thead>
                    <tr>
                        <th>Brand and Model</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryReport}
                </tbody>
            </table>
            <button className="Button" onClick={() => {props.handleInventoryReport(false)}}>Close</button>
        </div>
    );
}