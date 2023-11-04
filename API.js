import React, { useEffect, useState } from 'react'; 


export function LoginRequest(props) {
    const [loginRequest, setLoginRequest] = React.useState(props.json);
    const [loginResponse, setLoginResponse] = React.useState(null);

    function handleLoginRequest(json) {
        setLoginRequest(json);
    }

    function handleLoginResponse(response) {
        setLoginResponse(response);
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*'

            },
            body: JSON.stringify(loginRequest)
        };

        fetch('https://je60qiy1fi.execute-api.us-east-1.amazonaws.com/default/handleLogin', requestOptions)
            .then(response => {
                console.log(response);
                response.json();
            })
            .then(data => {
            console.log(data);
            setLoginResponse(data);
            return data;
            })
        }, []);

    return loginResponse;
}

export function CreateStoreRequest(props) {
    const [createStoreRequest, setCreateStoreRequest] = React.useState(props.json);
    const [createStoreResponse, setCreateStoreResponse] = React.useState(null);

    function handleCreateStoreRequest(json) {
        setCreateStoreRequest(json);
    }

    function handleCreateStoreResponse(response) {
        setCreateStoreResponse(response);
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(createStoreRequest)
        };

        fetch('https://3wg7dcs0o4.execute-api.us-east-1.amazonaws.com/default/createStore', requestOptions)
            .then(response => {
                console.log(response);
                response.json();
            })
            .then(data => {
            console.log(data);
            setCreateStoreResponse(data);
            return data;
            })
        }, []);

    return createStoreResponse;
}