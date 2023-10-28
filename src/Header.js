import React from "react";
import './App.css';
import App from './App.js';


export function Header() {
    if (App.user == null) {
        return (
            <header className="App-header">
                <h1 className="Brand">Everest</h1>
                <button className="Button">Login</button>
                <button className="Button">Create Store</button>
                <button className="Button">About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    } else if (App.user === 'owner') {
        return (
            <header className="App-header">
                <h1 className="Brand">Everest</h1>
                <button className="Button">Logout</button>
                <button className="Button">Create Store</button>
                <button className="Button">About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    } else if (App.user === 'customer') {
        return (
            <header className="App-header">
                <h1 className="Brand">Everest</h1>
                <button className="Button">Logout</button>
                <button className="Button">About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    } else if (App.user === 'manager') {
        return (
            <header className="App-header">
                <h1 className="Brand">Everest</h1>
                <button className="Button">Logout</button>
                <button className="Button">Create Store</button>
                <button className="Button">About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    } else {
        return (
            <header className="App-header">
                <h1 className="Brand">Everest</h1>
                <button className="Button">Login</button>
                <button className="Button">Create Store</button>
                <button className="Button">About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    }
}


