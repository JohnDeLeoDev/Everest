//remove store - site manager dashboard
import { RemoveStoreRequest } from "../API";
import React from "react";


//************************************************************* */
export default function RemoveStore(props)
/**
 * @brief function to remove store from the site
 * 
 *      ** created for store name removal, not id 
 ******************************************************************/
{
    // setCreateStoreRequest triggers a POST request to the server
    const [removeStoreRequest, setRemoveStoreRequest] = React.useState(null);

    let json = null;

    console.log("IN REMOVE")
    
    function handleRemoveStoreRequest(event) {

        var storeName = document.getElementById("remove-store").value; 
        console.log("vlue is", storeName)

        //const form = document.forms.remove;
        //const formData = new FormData(form);
        //let storeName = formData.get("storeName");
        console.log("STORENAME", storeName)
        json = {
            "name": JSON.stringify(storeName),
        };
        console.log("requesting", json)
        setRemoveStoreRequest(storeName);
    }
//<form id={"remove"}>,            </form>

    return (
        <div>
            
            <div>
                <label>Search for Store by Name</label>
                <input 
                    id="remove-store" 
                    name="storeName"
                    placeholder="Search for store to remove"
                />
                <br/>
                <button onClick={() => handleRemoveStoreRequest()}>Remove</button>
            </div>
            {removeStoreRequest && <RemoveStoreRequest json={removeStoreRequest} />}
        </div>
    )


    
}