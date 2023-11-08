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
    const json = '';

    function handleRemoveStoreRequest(event) {
        let storeName_ = document.getElementsByName("storeName");
        let data = {"storeID":storeName_};
        console.log(data);
        console.log(json);
        setRemoveStoreRequest(data);
    }

    console.log("remove computer ID "+ props.removeId)
    return (
        <div>
            <form>
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
        </div>
    )


    
}