//GenerateInventory.js

/*****************************************************************************************
 * @author EM
 * @date First draft - Nov 18 2023
 * update Nov 20, adding display function from JD
 * 
 * This file will provide the Customer view to "go to" a store from the Search > Stores 
 *      navigation selection
 * The page will display all of the computers for the store (storeID)
 ****************************************************************************************/

//this is the function for the filter boxes
export function StoreResults(props){
    var storeResults = [];
    var customerStoreInventory = props.computers;

    function handleBuyClick(computer){
        console.log("Buy button clicked");
        props.handleCoordinatesIntake(true, computer);
    }

    if (customerStoreInventory === null 
        || customerStoreInventory === undefined 
        || customerStoreInventory === 0) {
        return (
            <div className="search-results">
                <div className="computer-card">
                    <h2>No results found</h2>
                </div>
            </div>
        )
    } else {
        for (let storeName in customerStoreInventory){
            storeResults.push(
                <div className="store-results">
                    <div className="store-card">
                        <h1 className="banner">{storeName}</h1>
                    </div>
                    <div className="computer-results">
                        {customerStoreInventory[storeName].map((computer) => {
                                return (
                                    <div className="computer-card">
                                        <div className="compare-check">
                                            <input type="checkbox" id="computer-compare" value={computer.inventoryID}/>
                                            <label for="computer-compare">Compare</label>
                                        </div>
                                        <h2>{computer.brand} {computer.model}</h2> 
                                        <p>Price: {computer.price}</p>
                                        <p>Memory: {computer.memory}</p>
                                        <p>Storage: {computer.storageSize}</p>
                                        <p>Processor: {computer.processor}</p>
                                        <p>Process Generation: {computer.processGen}</p>
                                        <p>Graphics: {computer.graphics}</p>
                                        <button onClick={() => handleBuyClick(computer)} >Buy</button>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            )
        }
        return (
            <>
                {storeResults}
            </>
        )
    }
    
}

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

    let inventory = props.computers;

    console.log(inventory)

    let displayComputers = {}

    displayComputers = (
        <div>
            <StoreResults 
                computers={inventory}
                handleCoordinatesIntake={props.handleCoordinatesIntake}
            />
        </div>
    )

    return (
        <div>
            <h3></h3>
            <div>
                {displayComputers}
            </div>
        </div>
    )
}