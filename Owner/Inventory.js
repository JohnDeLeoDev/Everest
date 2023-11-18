import React, { useEffect } from 'react';
import { GetStoreInventory } from '../API';
import { RemoveComputerRequest } from '../API';
import { ModifyComputerRequest } from '../API';
import { AddBalanceRequest } from '../API';
import { RemoveBalanceRequest } from '../API';


/**********************************************************
 * store inventory function
 *      displays all computers in the inventory
 * *******************************************************/

export default function Inventory(props) {
    const [removeCompState, setRemoveCompState] = React.useState(null);
    const [removeCompResponse, setRemoveCompResponse] = React.useState(null);
    const [modifyCompState, setModifyCompState] = React.useState(null);
    const [modifyCompSubmit, setModifyCompSubmit] = React.useState(null);
    const [modifyCompResponse, setModifyCompResponse] = React.useState(null);
    const [modifyCompRequest, setModifyCompRequest] = React.useState(null);

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

    function handleModifyComputerRequest(computer) {
        setModifyCompState(computer);
    }

    function handleModifyComputerSubmit() {
        let form = document.getElementById("modify-form");
        let formData = new FormData(form);
        let json = {};
        for (let [key, value] of formData.entries()) {
            json[key] = value;
        }
        json.inventoryID = String(modifyCompState.inventoryID);
        setModifyCompRequest(JSON.stringify(json));
    }

    function handleModifyComputerResponse(json) {
        setModifyCompResponse(json);
    }

    function modifyComputer(computer) {
        let inventoryID = computer.inventoryID;
        let brand = computer.brand;
        let model = computer.model;
        let description = computer.description;
        let price = computer.price;
        let memory = computer.memory;
        let storageSize = computer.storageSize;
        let processor = computer.processor;
        let processGen = computer.processGen;
        let graphics = computer.graphics;

        return (
            <div>
                <form id="modify-form" onSubmit={handleModifyComputerSubmit}>
                    <label>Brand</label>
                    <input type="text" name="brand" defaultValue={brand} />
                    <label>Model</label>
                    <input type="text" name="model" defaultValue={model} />
                    <label>Description</label>
                    <input type="text" name="description" defaultValue={description} />
                    <label>Price</label>
                    <input type="text" name="price" defaultValue={price} />
                    <label>Memory</label>
                    <input type="text" name="memory" defaultValue={memory} />
                    <label>Storage Size</label>
                    <input type="text" name="storageSize" defaultValue={storageSize} />
                    <label>Processor</label>
                    <input type="text" name="processor" defaultValue={processor} />
                    <label>Processor Generation</label>
                    <input type="text" name="processGen" defaultValue={processGen} />
                    <label>Graphics</label>
                    <input type="text" name="graphics" defaultValue={graphics} />
                    <button type="submit" onClick={handleModifyComputerSubmit}>Submit</button>;
                </form>
            </div>   
        )
    }


    for (let key in props.inventory) {
        table.push(
            <tr key={props.inventory[key].inventoryID}>
                <td>{props.inventory[key].brand} {props.inventory[key].model}</td>
                <td>{props.inventory[key].description}</td>
                <td>{props.inventory[key].price}</td>
                <td><button onClick={() => {
                    handleModifyComputerRequest(props.inventory[key])
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
            {modifyCompSubmit && <ModifyComputerRequest json={modifyCompState} />}
            {removeCompResponse && <p>{removeCompResponse.message}</p>}
            {removeCompResponse && <AddBalanceRequest userID={props.user[0]} amount={"25"}/>}
            {removeCompResponse && <RemoveBalanceRequest userID={props.user[0]} amount={"25"}/>}
            {removeCompResponse && <GetStoreInventory userID={props.user[0]} handleInventory={props.handleInventory}/>}
            {(props.user[0] !== null && props.user[0] !== undefined) ? <GetStoreInventory userID={props.user[0]} handleInventory={props.handleInventory}/> : null}
            {modifyCompRequest && <ModifyComputerRequest json={modifyCompRequest} handleModifyComputerResponse={handleModifyComputerResponse}/>}
            {modifyCompState && modifyComputer(modifyCompState)}

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

