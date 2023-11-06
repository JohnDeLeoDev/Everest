import React, { useEffect } from 'react';
import { GetStoreInventory } from '../API';

/**********************************************************
 * store inventory function
 *      displays all computers in the inventory
 * *******************************************************/

export default function Inventory(props) {
    let modifyComp = props.modifyComp;
    let removeComp = props.removeComp;
    let table = [];

    for (let key in props.inventory) {
        console.log(props.inventory[key]);
        table.push(
            <tr key={props.inventory[key].inventoryID}>
                <td>{props.inventory[key].brand} {props.inventory[key].model}</td>
                <td>{props.inventory[key].description}</td>
                <td>{props.inventory[key].price}</td>
                <td><button>Modify</button></td>
                <td><button>Remove</button></td>
            </tr>
        );
    }
    // returns the JSX for the inventory page
    return (
        <>
            <h1>Inventory</h1>
            {props.user[0] !== null && props.user[0] !== undefined ? <GetStoreInventory userID={props.user[0]} handleInventory={props.handleInventory}/> : null}
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