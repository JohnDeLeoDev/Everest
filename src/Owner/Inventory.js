export default function Inventory(props) {
    let modifyComp = props.modifyComp;
    let removeComp = props.removeComp;


    const computers = [
        {
            id: 1,
            brand: "Apple",
            model: "Macbook Pro",
            description: "13-inch, 2018, Four Thunderbolt 3 Ports",
            price: 1799.99
        },
        {
            id: 2,
            brand: "Apple",
            model: "Macbook Pro",
            description: "13-inch, 2019, Two Thunderbolt 3 Ports",
            price: 1299.99
        },
        {
            id: 3,
            brand: "Apple",
            model: "Macbook Pro",
            description: "16-inch, 2019",
            price: 2399.99
        },
        {
            id: 4,
            brand: "Apple",
            model: "Macbook Air",
            description: "13-inch, 2019",
            price: 1099.99
        },
        {
            id: 5,
            brand: "HP",
            model: "Pavilion",
            description: "15-inch, 2019",
            price: 699.99
        },
        {
            id: 6,
            brand: "HP",
            model: "Envy",
            description: "13-inch, 2019",
            price: 899.99
        },
    ]

    
    function displayComputers(computers) {
        let tableData = [];


        for (let i = 0; i < computers.length; i++) {
            tableData.push(
                <tr>
                    <td>{computers[i].brand} {computers[i].model}</td>
                    <td>{computers[i].description}</td>
                    <td>{
                        modifyComp[0] && modifyComp[1] === computers[i].id ? <input type="text" placeholder={computers[i].price} /> : computers[i].price
                        }</td>
                    <td><button className="SubButton" onClick={() => {props.handleModifyComp(true, computers[i].id)}}>
                        {modifyComp[0] && modifyComp[1] === computers[i].id ? "Submit" : "Modify"}
                        </button></td>
                    <td><button className="SubButton" onClick={() => {props.handleRemoveComp(true, computers[i].id)}}>
                        {removeComp[0] && removeComp[1] === computers[i].id ? "Confirm" : "Remove"}
                        </button></td>
                </tr>
            )
        }
        return tableData;
    }


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