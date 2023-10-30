/**
 * @brief Remove a computer from a store
 *      must be logged in as Store Owner to do this
 */

export default function RemoveComputer(props, computerId)
{
    if (props.user === 'owner'){
        //remove the computer selected from the database
        computerId = -1;    //invalid id
        //re-render the display of computers listed in the dashboard
    } else {
        alert("You do not have credentials for this action, please log in to Remove Computer")
    }
}