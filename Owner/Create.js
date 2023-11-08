import { CreateStoreRequest } from '../API.js';
import React from 'react';

// Note: Create Store Component
export default function Create(props) 
/**
 * @brief a user creates a store
 *        after which a login is created
 *******************************************************/
{

    // setCreateStoreRequest triggers a POST request to the server
    const [createStoreRequest, setCreateStoreRequest] = React.useState(null);
    function handleCreateStoreRequest(event) {
        event.preventDefault();
        const form = document.getElementById("create-store");
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log(json);
        setCreateStoreRequest(json);
    }

    function backButton() {
        props.handleCreateStore(false);
        props.handleFailedStore(false);
        props.handleStoreCreated(false);
    }

    //<button><input type="file" />Upload Logo</button>
    return (
        <div className='format-form'>
            <h1>Create Store</h1>
            <form id="create-store" className='intake-form'>
                <div>
                    <label>Store Name *</label>
                    <input 
                        type="text"
                        name="arg1"
                        required={false}
                    />
                </div>

                <br />

                <div>
                    <div>
                    <label>Username *</label>
                    <input 
                        type="text"
                        name="userID"
                        required={false}
                    />
                </div>

                <div>
                    <label>Password*</label>
                    <input 
                        type="text"
                        name="password"
                        required={false}
                    />
                </div>

                <div>
                    <label>First Name</label>
                    <input 
                        type="text"
                        name="fname"
                        required={false}
                    />
                </div>

                <div>
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        name="lname"
                        required={false}
                    />
                </div>
                </div>

                <div>
                    <label>Email *</label>
                    <input 
                        type="text"
                        name="email"
                        required={false}
                    />
                </div>

                <div>
                    <label>Phone Number</label>
                    <input 
                        type="text" 
                        name="phone"
                        required={false}
                    />
                </div>

                <div>
                    <label>Street Address</label>
                    <input 
                        type="text"
                        name="address"
                        required={false}                             
                    />
                </div>

                <div>
                    <label>City</label>
                    <input 
                        type="text" 
                        name="city"
                        required={false}
                    />
                </div>

                <div>
                    <label>State</label>
                    <input 
                        type="text"
                        name="state"
                        required={false} 
                    />
                </div>

                <div>
                    <label>Zip Code</label>
                    <input 
                        type="text"
                        name="zip"
                        required={false}
                    />
                </div>

                <div>
                    <label>Country</label>
                    <input 
                        type="text"
                        name="country"
                        required={false} 
                    />
                </div>
                <br/>
                <div>
                <label>Latitude *</label>
                    <input 
                        type="text"
                        name="lat"
                        required={false} 
                    />
                </div>

                <div>
                <label>Longitude *</label>
                    <input 
                        type="text"
                        name="longitude"
                        required={false} 
                    />
                </div>

                <div>
                    <label>Store Description</label>
                    <textarea 
                        name="description" 
                        form="create-store"
                        required={false}
                    ></textarea>
                </div>

                <div>
                    <a href="">Terms and Conditions</a>
                    <input 
                        type="checkbox"
                        name="terms-and-conditions"
                        required={false}
                    />
                </div>

                <div>
                    <button name="submit" type="submit" onClick={handleCreateStoreRequest}>Create Store</button>
                </div>
            </form>

            {createStoreRequest !== null ? <CreateStoreRequest json={createStoreRequest} handleFailedStore={props.handleFailedStore} failedCreateStore={props.failedCreateStore} storeCreated={props.storeCreated} handleStoreCreated={props.handleStoreCreated}  /> : null}
            {props.failedCreateStore ? <h3>Failed to create store.</h3> : null}
            {props.storeCreated === true ? <h1>Store created successfully!</h1> : null}
            {props.storeCreated === true ? <button onClick={backButton}>Back</button> : null}
        </div>
    )
}
