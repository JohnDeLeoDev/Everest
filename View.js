import React from "react";
import './App.css';
import App from './App.js';

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
            <h1>Owner View</h1>
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

export function View() {
    if (App.user === 'owner') {
        <OwnerView />
    } else if (App.user === 'manager') {
        <ManagerView />
    } else if (App.user === 'customer') {
        <CustomerView />
    } else {
        <Landing />
    }
    
    return (
        <div className="View">
            {() => {
                if (App.user === 'owner') {
                    <OwnerView />
                } else if (App.user === 'manager') {
                    <ManagerView />
                } else if (App.user === 'customer') {
                    <CustomerView />
                } else {
                    <Landing />
                }
            }}
        </div>)
}
