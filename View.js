import React from "react";
import './everest_style.css';
import Create from './Owner/Create.js';
import {Login} from './Login.js';
import About from './About.js';
import Inventory from "./Owner/Inventory";

import AddComputer from "./Owner/AddComputer";
import InventoryReport from "./Owner/InventoryReport";
import { GenerateBalance, GenerateSiteManagerBalance, GenerateStoreBalance } from "./Manager/GenerateBalance";
import { SearchComputer, SearchStores } from "./Customer/Search";
import { GenerateAllStoreInventoryReport , GenerateStoreInventoryReport} from "./Manager/GenerateReport";

//*********************************************** */
function Footer()
/**
 * @brief this is a View helper class to standardize
 *      UX commonalities between views
 **************************************************/
{
    return (
        <div>
            <br />
            <hr color="white" clear="right"/>
            <footer>
                <address>
			    Everest Computer Consignment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			    established 2023
	            </address>
	
            </footer>
        </div>
    )
}

//********************************************* */
export function ManagerView() 
/** 
 * @brief the manager view
 *      manager must log in to view dashboard
 ************************************************/ 
{
   return (
        <div className="bodybag">
            
            <title>Administrator Dashboard</title>
                <div>
                    <h2>Logged in as Admin</h2>
                </div>
            
            <Footer/>
        </div>
    );
}

//****************************************** */
function OwnerView(props) 
/**
 * @brief the StoreOwner view - 
 *      Store Owner must be logged in
 **********************************************/
{
    const storeName = "default" 
    //somehow when we load the view from login can take store name
    return (
        <div className="OwnerView">
            <title>{storeName} - Owner Dashboard</title>
               <Inventory 
                    modifyComp={props.modifyComp} 
                    removeComp={props.removeComp} 
                    handleModifyComp={props.handleModifyComp} 
                    handleRemoveComp={props.handleRemoveComp} 
                    inventoryView={props.inventoryView}
                    handleInventory={props.handleInventory}
                    inventory={props.inventory}/>
            <Footer/>
        </div>

        // {props.inventoryView === false ? <button className={"SubButton"} onClick={() => {props.handleInventoryView(true)}}>Inventory</button> : null}
        //{props.inventoryView === true ? <button className={"SubButton"} onClick={() => {props.handleInventoryReport(true)}}>Generate Inventory Report</button> : null}
            
    );
}

//*********************************************** */
export function Landing() 
/**
 * @brief main landing page for the site, 
 *      from here all functionality may be linked
 ***************************************************/
{
    return (
        <div className="Landing-page">
            <body>
      <div id="elevator">
                    <p>Search thousands of used computers</p>
	                <p>Find rare models and features at low costs</p>
	                <p>New deals every day</p>
                </div>
            </body>

            <Footer/>
        </div>
    );
}

export default function View(props) {
    
    return (
        <div>
            {props.user === 'owner' && <OwnerView 
                modifyComp={props.modifyComp} 
                removeComp={props.removeComp} 
                handleModifyComp={props.handleModifyComp} 
                handleRemoveComp={props.handleRemoveComp} 
                inventoryView={props.inventoryView}
                handleInventory={props.handleInventory}
                inventory={props.inventory}/>}
            {props.user === 'manager' && <ManagerView />}
            {props.createStore === true && <Create />}      
            {props.user === null && <Landing />}
            {props.login === true && <Login handleUser={props.handleUser}/>}
            {props.about === true && <About />}
            {props.logout === true && <Landing /> }
            {props.addComputer === true && <AddComputer/>}
            {props.inventoryReport === true && <InventoryReport 
                inventory={props.inventory}
                handleInventoryReport={props.handleInventoryReport}/>}

            {props.showBalances === "Site Manager" && <GenerateSiteManagerBalance
               handleSiteManagerBalance={props.handleSiteManagerBalance} />}

            {props.setStoreReport  === "All Stores" && <GenerateAllStoreInventoryReport 
                descending={props.descending}
                stores={props.stores}
                handleSetStoreReport={props.handleSetStoreReport}/>}

            {props.setStoreReport === "One Store" && <GenerateStoreInventoryReport
                stores={props.stores}
                />}

            {props.search === "Stores" && <SearchStores
                stores={props.stores}/>}
            {props.search === "Computers" && <SearchComputer/>}

            


        </div>
    )
}
