import React from "react";
import './App.css';
import App from './App.js';


export function Header(props) {
    let user = props.user;

    if (user == null) {
        return (
            <header className="App-header">
                <h1 className="Brand"><a href="">Everest</a></h1>
                <button className="Button" onClick={() => {props.handleLogin(true)}}>Login</button>
                <button className="Button" onClick={() => {props.handleCreateStore(true)}}>Create Store</button>
                <button className="Button" onClick={() => {props.handleAbout(true)}}>About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    } else if (user === 'owner') {
        return (
            <header className="App-header">
                <h1 className="Brand"><a href="">Everest</a></h1>
                <button className="Button" onClick={() => {props.handleLogout()}} >Logout</button>
                <button className="Button" onClick={() => {props.handleCreateStore(true)}}>Create Store</button>
                <button className="Button" onClick={() => {props.handleAbout(true)}}>About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    } else if (user === 'customer') {
        return (
            <header className="App-header">
                <h1 className="Brand"><a href="">Everest</a></h1>
                <button className="Button" onClick={() => {props.handleLogout()}}>Logout</button>
                <button className="Button" onClick={() => {props.handleAbout(true)}}>About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    } else if (user === 'manager') {
        return (
            <header className="App-header">
                <h1 className="Brand"><a href="">Everest</a></h1>
                <button className="Button" onClick={() => {props.handleLogout()}}>Logout</button>
                <button className="Button" onClick={() => {props.handleCreateStore(true)}}>Create Store</button>
                <button className="Button" onClick={() => {props.handleAbout(true)}}>About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    } else {
        return (
            <header className="App-header">
                <h1 className="Brand"><a href="">Everest</a></h1>
                <button className="Button" onClick={() => {props.handleLogin(true)}}>Login</button>
                <button className="Button" onClick={() => {props.handleCreateStore(true)}}>Create Store</button>
                <button className="Button" onClick={() => {props.handleAbout(true)}}>About Us</button>
                <button className="Button">Search</button>
                <button className="Button">?</button>
            </header>
        );
    }
}


