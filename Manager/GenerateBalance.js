/**
 * @brief Generate reports for site manager
 */


//*************************************************** */
export function GenerateStoreBalance(props)
/**
 * @brief Generate the Sales Balance for All Stores
 ****************************************************/
{
    return (
        <div>
            Get the balances from all stores
            <button className="Button" onClick={() => {props.handleStoreBalance(false)}}>Close</button>
        </div>
    )
}

//*************************************************** */
export function GenerateSiteManagerBalance(props)
/**
 *  @brief Generate the Site Manager's Balance
 *******************************************************/
{
    //this is one value we retrieve from database?
    return (
        <div>
            <h3>SITE MANAGER BALANCE</h3>
            <br/>
            <button className="Button" onClick={() => {props.handleSiteManagerBalance(false)}}>Close</button>
        </div>
    )
}


