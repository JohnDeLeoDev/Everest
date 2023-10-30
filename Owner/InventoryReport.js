export default function InventoryReport(props) {
    let inventory = props.inventory;
    let inventoryReport = [];

    for (let i = 0; i < inventory.length; i++) {
        inventoryReport.push(
            <tr key={inventory[i].id}>
                <td>{inventory[i].brand} {inventory[i].model}</td>
                <td>{inventory[i].description}</td>
                <td>{inventory[i].price}</td>
                <td>{inventory[i].quantity}</td>
            </tr>
        );
    }


    return (
        <div className="InventoryReport">
            <h1>Inventory Report</h1>
            <table>
                <thead>
                    <tr>
                        <th>Brand and Model</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
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