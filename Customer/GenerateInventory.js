//GenerateInventory.js

/*****************************************************************************************
 * @author EM
 * @date First draft - Nov 18 2023
 * 
 * This file will provide the Customer view to "go to" a store from the Search > Stores 
 *      navigation selection
 * The page will display all of the computers for the store (storeID)
 ****************************************************************************************/

//************************************************************************************* */
export function GenerateStore(props)
/**
 *  @brief function to generate the inventory from one store selected by the customer
 *          from Search > Stores
 *  @parameters
 *      computers: an array of computer objects retrieved from GetCustomerStoreInventory()
 *  @returns
 *      view of one store's inventory
 ***************************************************************************************/
{

    let inventory = props.customerStoreInventory;

    console.log("IN GENERATE STORE");

    let displayComputers = {}

    if (inventory == null || inventory == undefined){
        displayComputers =
            <div>
                <h2>Empty Store</h2>
            </div>
            
        
    } else {
        displayComputers =
        <div>
            {inventory.map((computer) => (
                <div className="computer-card">
                    <h2>{computer.brand} {computer.model}</h2> 
                    <p>Description: {computer.description}</p>
                    <p>Price: {computer.price}</p>
                    <p>Memory: {computer.memory}</p>
                    <p>Storage: {computer.storageSize}</p>
                    <p>Processor: {computer.processor}</p>
                    <p>Process Generation: {computer.processGen}</p>
                    <p>Graphics: {computer.graphics}</p>
                    <br/>
                    <button>Buy</button>
                </div>
            ))}
        </div>
        
    }

    return (
        <div>
            <h3>Store Name</h3>
            <div>
                {displayComputers}
            </div>
        </div>
    )
}