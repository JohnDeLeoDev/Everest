//list stores to filter by/go to
import { SearchStoreInventoryRequest } from "../API"
import React from "react";
import { GenerateStore } from "./GenerateInventory"

function makeList(inventory) {
    for (let i of inventory){
        console.log(i)
    }
}

export function ListStores(props)
{

    const [inventory, setInventory] = React.useState(null)
    let json = props.customerStoreInventory

    console.log("IN LIST STORES")

    

    return (
        <div>
            {<SearchStoreInventoryRequest 
                json={json}
                handleCustomerStoreInventory={setInventory}
                />}
            {<GenerateStore 
                handleCoordinatesIntake={props.handleCoordinatesIntake}
                computers={inventory}
            />}
        </div>
        
    )
    
}

/*
<GenerateStore 
                computers={inventory}
            />
*/


