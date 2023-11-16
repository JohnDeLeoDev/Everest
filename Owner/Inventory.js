import React, { useEffect } from 'react';
import { GetStoreInventory } from '../API';
import { RemoveComputerRequest } from '../API';
import { ModifyComputerRequest } from '../API';


/**********************************************************
 * store inventory function
 *      displays all computers in the inventory
 * *******************************************************/

export default function Inventory(props) {
    const [removeCompState, setRemoveCompState] = React.useState(null);
    const [removeCompResponse, setRemoveCompResponse] = React.useState(null);
    const [modifyCompState, setModifyCompState] = React.useState(null);
    const [modifyCompResponse, setModifyCompResponse] = React.useState(null);

    let modifyComp = props.modifyComp;
    let removeComp = props.removeComp;
    let table = [];

    function handleModifyComputerResponse(json) {
        setModifyCompResponse(json);
    }

    function handleRemoveComputerResponse(json) {
        setRemoveCompResponse(json);
    }

    function handleRemoveComputerRequest(inventoryID) {
        let json = {
            "inventoryID": inventoryID
        };
        setRemoveCompState(json);  
    }

    function handleModifyComputerRequest(inventoryID) {
        let json = {
            "inventoryID": inventoryID
        };
        setModifyCompState(json);
    }


    for (let key in props.inventory) {
        table.push(
            <tr key={props.inventory[key].inventoryID}>
                <td>{props.inventory[key].brand} {props.inventory[key].model}</td>
                <td>{props.inventory[key].description}</td>
                <td>{props.inventory[key].price}</td>
                <td><button onClick={() => {
                    handleModifyComputerRequest(props.inventory[key].inventoryID)
                }}>Modify</button></td>
                <td><button onClick={() => {
                    handleRemoveComputerRequest(props.inventory[key].inventoryID)
                }}>Remove</button></td>
            </tr>
        );
    }
    // returns the JSX for the inventory page
    return (
        <>
            <h1>Inventory</h1>
            {removeCompState && <RemoveComputerRequest json={removeCompState} handleRemoveComputerResponse={handleRemoveComputerResponse}/>}
            {modifyCompState && <ModifyComputerRequest json={modifyCompState} />}
            {removeCompResponse && <p>{removeCompResponse.message}</p>}
            {removeCompResponse && <GetStoreInventory userID={props.user[0]} handleInventory={props.handleInventory}/>}
            {(props.user[0] !== null && props.user[0] !== undefined) ? <GetStoreInventory userID={props.user[0]} handleInventory={props.handleInventory}/> : null}
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
                    {table}
                </tbody>
            </table>
        </>
    )
}