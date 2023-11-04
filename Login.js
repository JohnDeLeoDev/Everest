
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
        const form = document.getElementById("login");
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData));
        setLoginRequest(json);
    }

    console.log("LOGIN")
    return (
        <div  className="login" >
            <h1>Login</h1>
            <form id="login">
                <div>
                <label>Username</label>
                <input id="userID" type="text"/>
                </div>
                <div>
                <label>Password</label>
                <input id="password" type="password"/>
                </div>
                <br/><br/>
                <button onClick={handleLoginRequest} type="submit">Login</button>
                <br/><br/>
            </form>
            <br/><br/>
            <button className="Button" onClick={() => {props.handleUser("owner")}}>Owner</button>
            <button className="Button" onClick={() => {props.handleUser("manager")}}>Manager</button>
            {loginRequest !== null ? <LoginRequest json={loginRequest} /> : null}
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