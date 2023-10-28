import React from "react";
import './App.css';
import Create from './Owner/Create.js';
import Login from './Login.js';
import About from './About.js';

function ManagerView() {
    return (
        <div className="ManagerView">
            <h1>Manager View</h1>
        </div>
    );
}

function OwnerView() {
    return (
        <div className="OwnerView">
            <h1>Welcome, Owner</h1>
        </div>
    );
}

function CustomerView() {
    return (
        <div className="CustomerView">
            <h1>Customer View</h1>
        </div>
    );
}

function Landing() {
    return (
        <div className="Landing-page">
            <h1>Landing Page</h1>
        </div>
    );
}

export default function View(props) {
    
    return (
        <>
            {props.user === 'owner' && <OwnerView />}
            {props.user === 'manager' && <ManagerView />}
            {props.user === 'customer' && <CustomerView />}
            {(props.createStore === true && (props.user === 'manager' || props.user === 'owner')) && <Create />}
            {props.user === null && <Landing />}
            {props.login === true && <Login handleUser={props.handleUser}/>}
            {props.about === true && <About />}
            
        </>
    )
}
