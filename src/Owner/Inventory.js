export default function Inventory(props) {
    let modifyComp = props.modifyComp;
    let removeComp = props.removeComp;

    let computers = props.inventory;

    // handles the display of the computers in the inventory. Takes above array as input
    function displayComputers(computers) {
        let tableData = [];

        for (let i = 0; i < computers.length; i++) {
            tableData.push(
                <tr key={computers[i].id}>
                    <td>{computers[i].brand} {computers[i].model}</td>
                    <td>{computers[i].description}</td>
                    <td>{
                        modifyComp[0] && modifyComp[1] === computers[i].id ? <input type="text" placeholder={computers[i].price} /> : computers[i].price
                        }</td>
                    <td><button className="Button" onClick={() => {props.handleModifyComp(true, computers[i].id)}}>
                        {modifyComp[0] && modifyComp[1] === computers[i].id ? "Submit" : "Modify"}
                        </button></td>
                    <td><button className="Button" onClick={() => {props.handleRemoveComp(true, computers[i].id)}}>
                        {removeComp[0] && removeComp[1] === computers[i].id ? "Confirm" : "Remove"}
                        </button></td>
                </tr>
            )
        }
        return tableData;
    }

    // returns the JSX for the inventory page
    return (
        <>
            <h1>Inventory</h1>
            <table>
                <thead>
                    <tr>
                        <th>Brand and Model</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {displayComputers(computers)}
                </tbody>
            </table>

        </>
    )
}