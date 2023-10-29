import React from "react";
import './App.css';
import Create from './Owner/Create.js';
import Login from './Login.js';
import About from './About.js';
import AddComp from './Owner/AddComp.js';
import Inventory from './Owner/Inventory.js';
import ModifyComp from './Owner/Modify.js';
import RemoveComp from './Owner/Remove.js';

function ManagerView(props) {
    return (
        <div className="ManagerView">
            <h1>Manager View</h1>
            <button className="SubButton" onClick={() => {props.handleCreateStore(true)}}>Create Store</button>
            <button className="SubButton" onClick={() => {props.handleAddComp(true)}}>Add Computers</button>
        </div>
    );
}

function OwnerView(props) {
    return (
        <div className="OwnerView">
            <h1>Welcome, Owner</h1>
            <div className="SubMenu">
                <button className="SubButton" onClick={() => {props.handleCreateStore(true)}}>Create Store</button>
                <button className="SubButton" onClick={() => {props.handleAddComp(true)}}>Add Computers</button>
                <button className="SubButton" onClick={() => {props.handleInventory(true)}}>Inventory</button>
            </div>
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
            {props.user === 'owner' && <OwnerView handleAddComp={props.handleAddComp} handleCreateStore={props.handleCreateStore} handleInventory={props.handleInventory} handleModifyComp={props.handleModifyComp} handleRemoveComp={props.handleRemoveComp}/>}
            {props.user === 'manager' && <ManagerView handleAddComp={props.handleAddComp} handleCreateStore={props.handleCreateStore} />}
            {props.user === 'customer' && <CustomerView />}
            {(props.createStore === true && (props.user === 'manager' || props.user === 'owner')) && <Create />}
            {props.user === null && <Landing />}
            {props.login === true && <Login handleUser={props.handleUser}/>}
            {props.about === true && <About />}
            {props.addComp ===true && <AddComp />}
            {props.inventory === true && <Inventory modifyComp={props.modifyComp} removeComp={props.removeComp} handleModifyComp={props.handleModifyComp} handleRemoveComp={props.handleRemoveComp} />}           
        </>
    )
}
