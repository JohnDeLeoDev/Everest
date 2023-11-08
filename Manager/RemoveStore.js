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

    function handleRemoveStoreRequest(event) {
        const form = document.forms.remove;
        const formData = new FormData(form);
        let storeName = formData.get("storeName");

        let json = {
            "name": JSON.stringify(storeName),
        };

        setRemoveStoreRequest(json);
    }

    return (
        <div>
            <form id={"remove"}>
            <div>
                <label>Search for Store by Name</label>
                <input 
                    type='search' 
                    id="remove-store" 
                    name="storeName"
                    placeholder="Search for store to remove"
                />
                <br/>
                <button onClick={() => handleRemoveStoreRequest(json)}>Remove</button>
            </div>
            </form>
            {removeStoreRequest && <RemoveStoreRequest request={removeStoreRequest} />}
        </div>
    )


    
}