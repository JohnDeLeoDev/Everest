/**
 * @brief Generate reports for site manager
 */


//*************************************************** */
export function GenerateStoreBalance(props)
/**
 * @brief Generate the Balance for One Store
 ****************************************************/
{
    return (
        <div>
            USE CASE?
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
        <div className="bodybag">
            <h3>SITE MANAGER BALANCE</h3>
            <br/>
            <h3>$670,887.26</h3>
            <button className="Button" onClick={() => {props.handleSiteManagerBalance(false)}}>Close</button>
        </div>
    )
}


