// Note: Create Store Component
export default function Create(props) 
/**
 * @brief a user creates a store
 *        after which a login is created
 *******************************************************/
{

    return (
        <div className="create-store">
            <h1>Create Store</h1>
            <form id="intake-form">
                <div >
                    <label>Store Name</label>
                    <input type="text" />
                
                    <button><input type="file" />Upload Logo</button>
                    
                </div>

                <div>
                    <label>First Name</label>
                    <input type="text" />
                
                    <label>Last Name</label>
                    <input type="text" />
                </div>

                <div id='multi'>
                    <label>Email</label>
                    <input type="text" />
                
                    <label>Phone Number</label>
                    <input type="text"  maxlength='14' size='15'/>
                </div>

                <div>
                    <label>Street Address</label>
                    <input type="text" />
                </div>

                <div>
                    <label>City</label>
                    <input type="text" />
                
                    <label>State</label>
                    <input type="text" />
                
                    <label>Zip Code</label>
                    <input type="text" maxlength='10' size='11'/>
               
                    <label>Country</label>
                    <input type="text" maxlength='3'size='4'/>
                </div>

                <div>
                    <label>Store Description</label>
                    <textarea name="store-description" form="create-store"></textarea>
                
                    <a href="terms.html">Terms and Conditions</a>
                    <input type="checkbox" />
                
                    <button>Create Store</button>
                </div>
            </form>

        </div>
    )
    
}
