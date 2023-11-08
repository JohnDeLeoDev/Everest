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

    function handleRemoveStoreRequest() {
        let storeName_ = document.getElementsById("remove-store");
        console.log("storeName"+ storeName_)
        let data = {"name":storeName_};
        console.log(data);
        console.log(json);
        setRemoveStoreRequest(data);
    }

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
                <button onClick={() => {handleRemoveStoreRequest()}}>Remove</button>
            </div>
            </form>
        </div>
    )


    
}