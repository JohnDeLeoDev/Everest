
import React, { useEffect } from 'react';
import {LoginRequest} from './API.js';
import bcrypt from 'bcryptjs';

//************************************************** */
export function Login(props) 
/**
 * @brief log in to Store Owner or Site Manager Dashboard
 */
{
    const [loginRequest, setLoginRequest] = React.useState(null);

    function handleLoginRequest(event) {
        event.preventDefault();
        const form = document.forms.login;
        const formData = new FormData(form);
        let userID = formData.get("userID");
        let password = formData.get("password");

        if (userID === null || userID === undefined || userID === "" || password === null || password === undefined || password === "") {
            props.handleFailedLogin(true);
        } else {
            var json = {
                "userID": userID,
                "password": password
            };
            setLoginRequest(json);
        }
    }

    //need to switch "userID" to user email to link to store
    return (
        <div className='login'>
        <h1>Login</h1>
        <form name="login" onSubmit={handleLoginRequest}>
            <label htmlFor="userID">User ID</label>
            <input type="text" name="userID" />
            <br/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <br/>
            <button id="submit" type="submit" onClick={handleLoginRequest}>Login</button>
        </form>

        {loginRequest !== null ? <LoginRequest handleFailedLogin={props.handleFailedLogin} json={loginRequest} handleUser={props.handleUser}/> : null}
        {props.failedLogin ? <p>Invalid Login. Please try again.</p> : null}
        </div>

    )
}

//****************************************************** */
export function Logout(props) 
/**
 * @brief log out of Store Owner or Site Manager Dashboard
 *          
 *      If we are creating some session token, we destroy
 *           it here
 *********************************************************/
{
    props.handleUser("");

    return (
        <div>
        </div>
    )
}