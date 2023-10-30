/**
 * @brief Generate reports for site manager
 */

function compareBalance (a, b)
{
    if (a.storeBalance < b.storeBalance){ 
        return -1;
    } else if (a.storeBalance > b.storeBalance){
        return 1;
    } else {
        return 0;
    }
}

export function GenerateStoreBalance(props){
    //there must be a better way to temporarily store the stores
    //const objArray = JSON.parse(props.stores);
    const objArray = props.stores;
    const sortedObjArray = objArray.sort(compareBalance);  //sorts ascending by default
    const reportBody = []
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (props.descending){
        //build structure ascending
        for (let i = (objArray.length-1); i > 0; i--){
            reportBody.push(
                <tr>
                <td>{sortedObjArray[i].name}</td>
                <td>{sortedObjArray[i].storeBalance}</td>
            </tr>
            )
        }
    } else {
        //build structure ascending (default)
        for (let i=0; i < objArray.length;i++){
            //build structure ascending
            reportBody.push(
                <tr key={sortedObjArray[i].storeID}>
                <td>{sortedObjArray[i].name}</td>
                <td>{sortedObjArray[i].storeBalance}</td>
            </tr>
            )
        }
    }

    return (
        <div className="bodybag">
            <p> 
                Store Balance Report {day}.{month}.{year}
            </p>
            <table>
                <thead>
                    <tr>
                        <th><h2>Store Name</h2></th>
                        <th><h2>Balance</h2></th>
                    </tr>
                </thead>
                <tbody>
                    {reportBody}
                </tbody>
            </table>
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
        <div className="bodybag">
            <h3>SITE MANAGER BALANCE</h3>
            <br/>
            <h3>$670,887.26</h3>
            <button className="Button" onClick={() => {props.handleSiteManagerBalance(false)}}>Close</button>
        </div>
    )
}


