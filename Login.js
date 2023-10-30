
//************************************************** */
export function Login(props) 
/**
 * @brief log in to Store Owner or Site Manager Dashboard
 */
{
    console.log("LOGIN")
    return (
        
        <div  className="login" >
        <h1>Login</h1>
        <div id='intake-form'>
            <div>
            <label>Username</label>
            <input type='text'/>
            </div>
            <div>
            <label>Password</label>
            <input type="text"/>
            </div>
            <br/><br/>
            <button className="Button" onClick={() => {props.handleUser("owner")}}>Owner</button>
            <button className="Button" onClick={() => {props.handleUser("manager")}}>Manager</button>
        </div>
        </div>
    )
}

//****************************************************** */
export function Logout(props) 
/**
 * @brief log out of Store Owner or Site Manager Dashboard
 *********************************************************/
{
    props.handleUser("");

    return (
        <div>
        </div>
    )
}