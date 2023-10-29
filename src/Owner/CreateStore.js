// Note: Create Store Component
export default function Create(props) {
    if (props.user === 'null') {
        props.handleCreateStore(false);
        return (
            <alert>You must be logged in to create a store.</alert>
        )
    } else {

        return (
            <>
                <h1>Create Store</h1>
                <form id="create-store">
                    <div>
                        <label>Store Name</label>
                        <input type="text" />
                    </div>

                    <div>
                        <button>Upload Logo</button>
                        <input type="file" />
                    </div>

                    <div>
                        <label>First Name</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label>Last Name</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label>Phone Number</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label>Street Address</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label>City</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label>State</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label>Zip Code</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label>Country</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label>Store Description</label>
                        <textarea name="store-description" form="create-store"></textarea>
                    </div>

                    <div>
                        <a href="">Terms and Conditions</a>
                        <input type="checkbox" />
                    </div>

                    <div>
                        <button onClick={props.handleCreateStore}>Create Store</button>
                    </div>
                </form>

            </>
        )
    }
}
